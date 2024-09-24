import React from 'react';
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Stack,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Pokemon} from 'pokenode-ts';
import {decimetresToHeightString, hectogramsToWeightString, toPokemonNumber, toTitleCase} from '../utils';
import TypeChip from './type_chips/TypeChip';

/**
 * Pokemon prop to pass through, using type as defined by pokenode-ts (https://pokenode-ts.vercel.app/)
 */
interface IProps {
    pokemon: Pokemon | undefined;
}

/**
 * Pokemon card to be displayed in general pokemon grid
 * @param props Pokemon whose data will be displayed
 */
const PokemonCardObject = (props: IProps) => {
    const navigate = useNavigate();
    const pokemon = props.pokemon;

    if (pokemon === undefined) {
        return <>loading...</>;
    }

    /**
     * Navigate to detailed pokemon page
     */
    const goToPokemon = () => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    return (
        <Card sx={{width: '280px', display: 'flex' }}>
            <CardActionArea  onClick={goToPokemon} >
                <Stack direction='row' spacing={-3} alignItems='center'>
                    <CardMedia
                        component='img'
                        image={pokemon.sprites.front_default !== null ? pokemon.sprites.front_default : undefined}
                        alt={`${pokemon.name} image`}
                        sx={{
                            width: '120px',
                            height: '120px',
                            overflow: 'hidden',
                        }}
                    />
                    <CardContent>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='h5' noWrap>
                                {toTitleCase(pokemon.name)}&nbsp;
                            </Typography>
                            <Typography> </Typography>
                            <Typography variant='h5' sx={{ color: 'text.secondary' }}>
                                {toPokemonNumber(pokemon.id)}
                            </Typography>
                        </Box>
                        <TypeChip pokemonType={pokemon.types.at(0)} />
                        <TypeChip pokemonType={pokemon.types.at(1)} />
                        <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1}}>
                            {`Height: ${decimetresToHeightString(pokemon.height)}`}
                        </Typography>
                        <Typography> </Typography>
                        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                            {`Weight: ${hectogramsToWeightString(pokemon.weight)}`}
                        </Typography>
                    </CardContent>
                </Stack>
            </CardActionArea>
        </Card>
    );
};

export default PokemonCardObject;
