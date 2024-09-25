import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";
import {darken} from '@mui/system';

interface IBackButtonProps {
    text?: string
    fullWidth?: boolean;
    bgColour?: string;
    textColour?: string;
}

const BackButton = (props: IBackButtonProps) => {
    const navigate = useNavigate();
    const bgColour = props.bgColour ? props.bgColour : '#ff0000';
    const textColour = props.textColour ? props.textColour : 'white';

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <Button variant="contained"
                fullWidth={props.fullWidth}
                onClick={handleClick}
                sx={{bgcolor: bgColour,
                    color: textColour,
                    '&:hover': {
                        backgroundColor: darken(bgColour, 0.2)
                    }}}
        >
            {props.text ? props.text : "Go Back"}
        </Button>
    );
};

export default BackButton;
