import React from 'react';
import {
    Avatar,
    Box,
    Card, CardActionArea,
    CardContent, CardHeader,
    CardMedia,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {Pokemon} from 'pokenode-ts';

interface IProps {
    pokemon: Pokemon | undefined;
}

const PokemonCardObject = (props: IProps) => {
    const navigate = useNavigate();
    const pokemon = props.pokemon;

    if (pokemon == undefined) {
        return <>"loading..."</>;
    }

    const goToPetition = () => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    return (
        <Card sx={{maxWidth: 550}}>
            <CardActionArea onClick={goToPetition} sx={{'&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'},}}>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={pokemon.sprites.front_default !== null ? pokemon.sprites.front_default : undefined}
                    alt={`${pokemon.name} image`}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Live From Space
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default PokemonCardObject;
