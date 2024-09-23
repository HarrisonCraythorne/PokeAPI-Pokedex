import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";

interface BackButtonProps {
    text?: string
    fullWidth?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({text, fullWidth}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <Button variant="contained" fullWidth={fullWidth} onClick={handleClick}>
            {text ? text : "Go Back"}
        </Button>
    );
};

export default BackButton;
