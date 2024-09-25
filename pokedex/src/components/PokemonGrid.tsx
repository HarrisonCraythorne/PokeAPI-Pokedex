import React from 'react';
import CSS from 'csstype';
import {Alert, AlertTitle, Box, Divider, MenuItem, Pagination, Paper, Select, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Pokemon, PokemonClient} from "pokenode-ts";
import PokemonCardObject from "./PokemonCardObject";
import {POKE_ID_RANGE} from "../constants/constants";

const PokemonGrid = () => {

    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [pokemon, setPokemon] = React.useState<Array<Pokemon>>([]);
    const [pageNum, setPageNum] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(35);
    const cardsPerPageOptions = [5, 10, 20, 35, 50];


    /**
     * Get the pokemon data from PokeAPI to populate the pokemon card grid
     * Utilising lazy loading, so only fetches pokemon that will show up on the current page
     */
    React.useEffect(() => {
        const getPokemon = async () => {
            const api = new PokemonClient();

            try {
                const promises: Array<Promise<Pokemon>> = [];
                // to ensure no strange errors if a page below 1 is somehow obtained
                const minIndexToFetch = Math.max(((pageNum - 1) * pageSize) + 1, POKE_ID_RANGE.MIN)
                const maxIndexToFetch = Math.min(pageNum * pageSize, POKE_ID_RANGE.MAX)
                for (let i = minIndexToFetch; i <= maxIndexToFetch; i++) {
                    promises.push(api.getPokemonById(i));
                }

                // Wait for all the promises to resolve
                const responses = await Promise.all(promises);
                setPokemon(responses);
                setErrorFlag(false);
                setErrorMessage('');
            } catch (error: any) {
                setErrorFlag(true);
                setErrorMessage(error.toString());
            }
        };
        getPokemon();
    }, [pageNum, pageSize]);

    /**
     * Function that maps pokemon objects into pokemon cards to display in the grid
     * Displays a message if no pokemon are found
     */
    const pokemon_rows = () => {
        if (errorFlag) {
            return (
                <div style={{display: "grid", minWidth: "280px"}}>
                        <Alert severity="error">
                            <AlertTitle>
                                Error
                            </AlertTitle>
                            {errorMessage}
                        </Alert>
                </div>
            )
        } else if (pokemon.length === 0) {
            return (
                <Stack sx={{m: 8}}>
                    <Typography variant="h6" color="text.primary" sx={{margin: "8 8 0", fontSize: "35px"}}>
                        Loading...
                    </Typography>
                </Stack>
            )
        } else {
            return (
                pokemon.map((pokemon: Pokemon) =>
                    <Grid sx={{display: "flex", justifyContent: "center"}}>
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", minWidth: "100%"}}>
                            <PokemonCardObject key={pokemon.id} pokemon={pokemon}/>
                        </Box>
                    </Grid>
                ))}
    };

    /**
     * Card styling for pokemon cards
     */
    const card: CSS.Properties = {
        padding: "10px",
        margin: "20px",
        display: "block",
        width: "auto"
    }

    /**
     * Handles page number updates
     * @param newPage The new page number to switch to. This param is automatically passed to this method by react.
     */
    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPageNum(newPage);
    };


    /**
     * Handles pagination page size changing. Attempts to put user on a page that would contain the same/similar listings
     * and previous page after the sizing. (e.g. if on page 4 with page size 5 (items 16-20), would put user on page 2
     * if new page size is 10 (items 11-20). Due to rounding this may not always be entirely accurate.
     */
    const handleChangePageSize = (event: { target: { value: string; }; }) => {
        const oldRowsPerPage = pageSize;
        const newRowsPerPage = parseInt(event.target.value, 10)
        setPageSize(newRowsPerPage);
        setPageNum(Math.ceil(((pageNum * oldRowsPerPage) - (oldRowsPerPage - 1)) / newRowsPerPage));
    };



    return (
        <Paper elevation={3} style={card}>
            <Box display='flex' justifyContent='center'>
                <Typography variant="h2" sx={{fontWeight: "bold"}} color="text.primary">
                    Pokedex
                </Typography>
            </Box>
            <Divider sx={{marginBottom: 1, marginTop: 1}}/>
            <Grid container spacing={3} sx={{justifyContent: "center"}}>
                {pokemon_rows()}
            </Grid>
            <Divider sx={{marginBottom: 1, marginTop: 1}}/>
            <Grid
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <Grid justifyContent='center'>
                    <Pagination
                        count={Math.ceil(POKE_ID_RANGE.MAX / pageSize)}
                        page={pageNum}
                        onChange={handlePageChange}
                        siblingCount={2}
                    />
                </Grid>
                <Grid justifyContent='flex-end'>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Typography variant='body2' color='textSecondary'>
                            Page Size
                        </Typography>
                        <Select
                            labelId='page-size-label'
                            value={pageSize.toString()}
                            onChange={handleChangePageSize}
                            size="small"
                            sx={{ minWidth: '70px' }}
                            variant='outlined'>
                            {cardsPerPageOptions.map((option: number) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PokemonGrid;
