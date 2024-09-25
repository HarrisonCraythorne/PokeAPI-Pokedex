import React from 'react';
import {
    Alert, AlertTitle,
    Box,
    CardMedia, Divider, Paper,
    Stack,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {Pokemon, PokemonClient} from 'pokenode-ts';
import {
    decimetresToHeightString,
    getPokemonAbilitiesString, getPokemonHiddenAbilityString, getPokemonWeakness,
    hectogramsToWeightString,
    toPokemonNumber,
    toTitleCase
} from '../utils';
import TypeChip from './type_chips/TypeChip';
import {useParams} from 'react-router-dom';
import NotFound from './NotFound';
import CSS from 'csstype';
import BackButton from './BackButton';

const PokemonDetailedView = () => {
    const id = useParams().pokemonId;
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);
    const [weaknesses, setWeaknesses] = React.useState<Array<string>>([]);

    /**
     * Get the pokemon data from PokeAPI for the specific pokemon's page
     */
    React.useEffect(() => {
        const getPokemon = async () => {
            if (id) {
                const api = new PokemonClient();

                try {
                    const pokemonId = parseInt(id, 10);
                    const pokemon: Pokemon = await api.getPokemonById(pokemonId);
                    setPokemon(pokemon);
                    setErrorFlag(false);
                    setErrorMessage('');
                    setWeaknesses(await getPokemonWeakness(pokemon.types));
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

    if (!id || !pokemon) {
        return (<NotFound/>)
    }

    function getWeaknessChips() {
        return (
            weaknesses.map((type: string, index: number) =>
                <Grid xs={1} key={'grid' + index} sx={{mb: 1}}>
                    <TypeChip key={'chip' + index} pokemonType={type}/>
                </Grid>)
        );
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
                <Grid container spacing={1} columns={12}>
                    <Grid xs={3} sx={{display: 'flex'}} alignItems='center' justifyContent='center'>
                        <BackButton text={'Return to Pokedex'}/>
                    </Grid>
                    <Grid xs={6} sx={{display: 'flex'}} alignItems='center' justifyContent='center'>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h2' noWrap>
                                {toTitleCase(pokemon.name)}&nbsp;
                            </Typography>
                            <Typography variant='h2' sx={{color: 'text.secondary'}}>
                                {toPokemonNumber(pokemon.id)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={3} sx={{display: 'flex'}} alignItems='center' justifyContent='center'>
                        {/*Here to align the pokemon name and number centrally as otherwise the back button
                           offsets them. Simply an empty block to take up space*/}
                        &nbsp;
                    </Grid>
                </Grid>
                <Divider sx={{marginBottom: 1, marginTop: 1}}/>
                <Stack direction='row' spacing={-4} alignItems='center'>
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
                    <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-evenly' sx={{width: '90%'}}>
                        <Stack spacing={0} sx={{width: '200px'}}>
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
