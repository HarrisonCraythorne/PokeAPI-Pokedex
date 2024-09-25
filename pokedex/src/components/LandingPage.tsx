import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {darken} from "@mui/system";
import React from "react";

const LandingPage = () => {
    const navigate = useNavigate();

    function goToPokedex() {
        navigate("/pokedex/1");
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '75vh'}} justifyContent='center' alignItems='center'>
            <Typography variant="h1" sx={{fontWeight: 'bold'}}>
                Welcome to Pokedex!
            </Typography>
            <Button variant="contained"
                    onClick={goToPokedex}
                    sx={{bgcolor: 'red',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: darken('#ff0000', 0.2)
                        }}}
            >
                Enter Pokedex
            </Button>
        </Box>
    )
}

export default LandingPage;
