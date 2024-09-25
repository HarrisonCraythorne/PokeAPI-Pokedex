import React from 'react';
import CSS from 'csstype';
import {Alert, AlertTitle, Box, Divider, MenuItem, Pagination, Paper, Select, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Pokemon, PokemonClient} from "pokenode-ts";
import PokemonCardObject from "./PokemonCardObject";
import {POKE_ID_RANGE} from "../constants/constants";
import {useNavigate, useParams} from "react-router-dom";

interface PokemonGridProps {
    pokemon: Pokemon[];
}

const PokemonGrid = (props: PokemonGridProps) => {

    const navigate = useNavigate();

    // Error stats if PokeAPI call fails
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    // Info about pokemon list, and page data.
    //const [pokemon, setPokemon] = React.useState<Array<Pokemon>>([]);
    const [currentPagePokemon, setCurrentPagePokemon] = React.useState<Array<Pokemon>>([]);
    //const [pageNum, setPageNum] = React.useState(1);
    const [pageSize, setPageSize] = React.useState<number>(35);
    // Options for number of pokemon per page
    const cardsPerPageOptions = [5, 10, 20, 35, 50, POKE_ID_RANGE.MAX];
    const pokemon = props.pokemon;
    const pageNum = parseInt(useParams().pageNum || '1');


    React.useEffect(() => {
        const getPokemon = () => {
            const pagePokemon: Array<Pokemon> = pokemon.slice(((pageNum - 1) * pageSize), pageNum * pageSize);
            setCurrentPagePokemon(pagePokemon);
            setErrorFlag(false);
            setErrorMessage('');
        };
        getPokemon();
    }, [pokemon, pageNum, pageSize]);

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
                currentPagePokemon.map((pokemon: Pokemon) =>
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
     * @param _event Here as if removed function does not work correctly, but automatically handled by React
     * @param newPage The new page number to switch to. This param is automatically passed to this method by react.
     */
    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        navigate(`/pokedex/${newPage}`);
    };


    /**
     * Handles pagination page size changing. Attempts to put user on a page that would contain the same/similar listings
     * and previous page after the sizing. (e.g. if on page 4 with page size 5 (items 16-20), would put user on page 2
     * if new page size is 10 (items 11-20). Due to rounding this may not always be entirely accurate.
     */
    const handleChangePageSize = (event: { target: { value: string; }; }) => {
        const newRowsPerPage = parseInt(event.target.value, 10)
        setPageSize(newRowsPerPage);
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
