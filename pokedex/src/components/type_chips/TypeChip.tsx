import React from "react";
import NormalChip from "./NormalChip";
import FireChip from "./FireChip";
import WaterChip from "./WaterChip";
import ElectricChip from "./ElectricChip";
import GrassChip from "./GrassChip";
import IceChip from "./IceChip";
import FightingChip from "./FightingChip";
import PoisonChip from "./PoisonChip";
import GroundChip from "./GroundChip";
import FlyingChip from "./FlyingChip";
import PsychicChip from "./PsychicChip";
import BugChip from "./BugChip";
import RockChip from "./RockChip";
import GhostChip from "./GhostChip";
import DragonChip from "./DragonChip";
import DarkChip from "./DarkChip";
import SteelChip from "./SteelChip";
import EmptyChip from "./EmptyChip";
import {PokemonType} from "pokenode-ts";
import FairyChip from "./FairyChip";

interface ITypeChipProps {
    pokemonType: PokemonType | string | undefined;
}

const TypeChip = (props: ITypeChipProps) => {

    const type = typeof props.pokemonType === 'string'
        ? props.pokemonType
        : props.pokemonType?.type.name;

    function chipFromType(type: string): any {
        switch (type.toLowerCase()) {
            case 'bug':
                return <BugChip/>;
            case 'dark':
                return <DarkChip/>;
            case 'dragon':
                return <DragonChip/>;
            case 'electric':
                return <ElectricChip/>;
            case 'fairy':
                return <FairyChip/>;
            case 'fighting':
                return <FightingChip/>;
            case 'fire':
                return <FireChip/>;
            case 'flying':
                return <FlyingChip/>;
            case 'ghost':
                return <GhostChip/>;
            case 'grass':
                return <GrassChip/>;
            case 'ground':
                return <GroundChip/>;
            case 'ice':
                return <IceChip/>;
            case 'normal':
                return <NormalChip/>;
            case 'poison':
                return <PoisonChip/>;
            case 'psychic':
                return <PsychicChip/>;
            case 'rock':
                return <RockChip/>;
            case 'steel':
                return <SteelChip/>;
            case 'water':
                return <WaterChip/>;
            default:
                return <EmptyChip/>;
        }
    }

    if (type) {
        return chipFromType(type);
    } else {
        return (<EmptyChip/>);
    }

};

export default TypeChip;