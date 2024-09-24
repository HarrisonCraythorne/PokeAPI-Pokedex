import React from 'react';
import { Chip } from '@mui/material';

interface ITypeChipProps {
    label: string;
    bgColour?: string;
    textColour?: string;
}

const BaseTypeChip = (props: ITypeChipProps) => {

    const bgColour = props.bgColour ? props.bgColour : 'white';
    const textColour = props.textColour ? props.textColour : 'white';

    return (
        <Chip
            label={props.label}
            sx={{bgcolor: bgColour, color: textColour, width: '71px', m: '1px 2px 0'}}
        />
    );
};

export default BaseTypeChip;