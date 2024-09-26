import React from 'react';
import {
    Alert, AlertTitle,
    Box,
    CardMedia, Divider, Paper,
    Stack,
    Typography, useMediaQuery, useTheme
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {Pokemon, PokemonClient} from 'pokenode-ts';
import {
    decimetresToHeightString,
    getPokemonAbilitiesString, getPokemonHiddenAbilityString, getPokemonDamageRelations,
    hectogramsToWeightString,
    toPokemonNumber,
    toTitleCase, DamageRelations
} from '../utils';
import TypeChip from './type_chips/TypeChip';
import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
import CSS from 'csstype';
import BackButton from './BackButton';
import EmptyChip from "./type_chips/EmptyChip";
import {POKE_ID_RANGE} from "../constants/constants";

const PokemonDetailedView = () => {
    const id = parseInt(useParams().pokemonId || '0', 10);
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
    const [weaknesses, setWeaknesses] = React.useState<Array<string>>([]);
    const [resistances, setResistances] = React.useState<Array<string>>([]);
    const [immunities, setImmunities] = React.useState<Array<string>>([]);

    // for finding screen size to better format for small screens
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    /**
     * Get the pokemon data from PokeAPI for the specific pokemon's page
     */
    React.useEffect(() => {
        const getPokemon = async () => {
            if (id && id > 0) {
                const api = new PokemonClient();

                try {
                    const pokemon: Pokemon = await api.getPokemonById(id);
                    setPokemon(pokemon);
                    setErrorFlag(false);
                    setErrorMessage('');
                    const damageRelations: DamageRelations = await getPokemonDamageRelations(pokemon.types)
                    setWeaknesses(damageRelations.weaknesses);
                    setResistances(damageRelations.resistances);
                    setImmunities(damageRelations.immunities);
                } catch (error: any) {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                }
            }
        }
        getPokemon();
    }, [id]);

    /**
     * Card styling for pokemon cards
     */
    const card: CSS.Properties = {
        padding: '10px',
        margin: '20px',
        display: 'block',
        width: 'auto'
    }


    /**
     * If invalid id, returns NotFound page, else displays a loading screen while api call is made
     */
    if (!id || id < POKE_ID_RANGE.MIN || id > POKE_ID_RANGE.MAX) {
        return (<NotFound/>)
    } else if (!pokemon) {
        return(
            <Typography variant='h2'>
                Loading...
            </Typography>
        );
    }

    /**
     * Gets the type chips of all the weakness types of the pokemon. If none returns an empty chip
     */
    function getWeaknessChips() {
        if (weaknesses.length === 0) {
            return (
                <Grid xs={1} key={'wgrid'} sx={{mb: 1}}>
                    <EmptyChip key={'wchip'}/>
                </Grid>);
        } else {
            return (
                weaknesses.map((type: string, index: number) =>
                    <Grid xs={1} key={'wgrid' + index} sx={{mb: 1}}>
                        <TypeChip key={'weak' + index} pokemonType={type}/>
                    </Grid>)
            );
        }
    }

    /**
     * Gets the type chips of all the resisted types of the pokemon. If none returns an empty chip
     */
    function getResistChips() {
        if (resistances.length === 0) {
            return (
                <Grid xs={1} key={'rgrid'} sx={{mb: 1}}>
                    <EmptyChip key={'rchip'}/>
                </Grid>);
        } else {
            return (
                resistances.map((type: string, index: number) =>
                    <Grid xs={1} key={'rgrid' + index} sx={{mb: 1}}>
                        <TypeChip key={'res' + index} pokemonType={type}/>
                    </Grid>)
            );
        }
    }

    /**
     * Gets the type chips of all the immune types of the pokemon. If none this whole section is not rendered in the
     * component return statement, so no need for empty chips here
     */
    function getImmuneChips() {
        return (
            immunities.map((type: string, index: number) =>
                <Grid xs={1} key={'igrid' + index} sx={{mb: 1}}>
                    <TypeChip key={'imm' + index} pokemonType={type}/>
                </Grid>)
        );
    }

    /**
     * Gets the header for the page, consisting of:
     *  - Back Button
     *  - Pokemon Name
     *  - Blank section for formatting if needed
     *  Formats wide for comp screens and tall for mobile
     */
    function getPageHeader() {
        if (pokemon) {
            return (
                <Grid container spacing={1} columns={12}>
                    <Grid md={3} sm={12} sx={{display: 'flex', width: '100%'}} alignItems='center'
                          justifyContent='center'>
                        <BackButton text={'Return to Pokedex'}/>
                    </Grid>
                    <Grid md={6} sm={12} sx={{display: 'flex', width: '100%'}} alignItems='center'
                          justifyContent='center'>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant={isSmallScreen ? 'h4' : 'h2'} noWrap>
                                {toTitleCase(pokemon.name)}&nbsp;
                            </Typography>
                            <Typography variant={isSmallScreen ? 'h4' : 'h2'} sx={{color: 'text.secondary'}}>
                                {toPokemonNumber(pokemon.id)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid md={3} sm={0} sx={{display: 'flex'}} alignItems='center' justifyContent='center'>
                        {/*Here to align the pokemon name and number centrally as otherwise the back button
                           offsets them. Simply an empty block to take up space*/}
                        &nbsp;
                    </Grid>
                </Grid>
            );
        }
    }

    if (errorFlag) {
        return (
            <div style={{display: 'grid', minWidth: '280px'}}>
                <Alert severity='error'>
                    <AlertTitle>
                        Error
                    </AlertTitle>
                    {errorMessage}
                </Alert>
            </div>
        )
    } else {
        return (
            <Paper elevation={3} style={card}>
                {getPageHeader()}
                <Divider sx={{marginBottom: 1, marginTop: 1}}/>
                <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={-4} alignItems='center'>
                    <CardMedia
                        component='img'
                        image={pokemon.sprites.front_default !== null ? pokemon.sprites.front_default : undefined}
                        alt={`Loading ${pokemon.name} image...`}
                        sx={{
                            width: '300px',
                            height: '300px',
                            overflow: 'hidden',
                        }}
                    />
                    <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={1} alignItems='center' justifyContent='space-evenly' sx={{width: '90%'}}>
                        <Stack spacing={0} sx={{width: '250px'}}>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Abilities:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {getPokemonAbilitiesString(pokemon.abilities)}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Hidden:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {getPokemonHiddenAbilityString(pokemon.abilities)}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Height:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {decimetresToHeightString(pokemon.height)}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Weight:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {hectogramsToWeightString(pokemon.weight)}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack spacing={0} sx={{width: '200px'}}>
                            {/*Titles for stats are hard coded, as these will not change and some names I don't prefer
                               e.g. I prefer Health over HP, but PokeAPI uses HP*/}
                            <Typography variant='h6'>
                                Stats:
                            </Typography>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Health:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {pokemon.stats[0].base_stat}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Attack:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {pokemon.stats[1].base_stat}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Defence:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {pokemon.stats[2].base_stat}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Special Attack:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {pokemon.stats[3].base_stat}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Special Defence:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {pokemon.stats[4].base_stat}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary'}}>
                                    Speed:&nbsp;
                                </Typography>
                                <Typography variant='h6'>
                                    {pokemon.stats[5].base_stat}
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='h6' sx={{color: 'text.secondary', fontWeight: 'bold'}}>
                                    Stat Total:&nbsp;
                                </Typography>
                                <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                                    {
                                        pokemon.stats[0].base_stat +
                                        pokemon.stats[1].base_stat +
                                        pokemon.stats[2].base_stat +
                                        pokemon.stats[3].base_stat +
                                        pokemon.stats[4].base_stat +
                                        pokemon.stats[5].base_stat
                                    }
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack>
                            <Typography variant='h6'>
                                {pokemon.types.length > 1 ? 'Types:' : 'Type:'}
                            </Typography>
                            <Box>
                                <TypeChip pokemonType={pokemon.types.at(0)} />
                                {// ensures only pokemon with two types have two type chips present
                                    // can be removed to always show two chips and have a blank second chips for monotype pokemon
                                    pokemon.types.at(1) && <TypeChip pokemonType={pokemon.types.at(1)} />}
                            </Box>
                            { immunities.length > 0 &&
                                <>
                                <Typography variant='h6' sx={{mt: 1}}>
                                    Immunities:
                                </Typography>
                                <Grid container columns={2} spacing={0} justifyContent='center' alignItems='center' sx={{width: '160px'}}>
                                    {getImmuneChips()}
                                </Grid>
                                </>
                            }
                            <Typography variant='h6' sx={{mt: 1}}>
                                Resistances:
                            </Typography>
                            <Grid container columns={2} spacing={0} justifyContent='center' alignItems='center' sx={{width: '160px'}}>
                                {getResistChips()}
                            </Grid>
                            <Typography variant='h6' sx={{mt: 1}}>
                                Weaknesses:
                            </Typography>
                            <Grid container columns={2} spacing={0} justifyContent='center' alignItems='center' sx={{width: '160px'}}>
                                {getWeaknessChips()}
                            </Grid>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        );
    }
};

export default PokemonDetailedView;
