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

interface ITypeChipProps {
    pokemonType: PokemonType | undefined;
}

const TypeChip = (props: ITypeChipProps) => {

    const type = props.pokemonType ? props.pokemonType.type.name : undefined;

    function chipFromType(type: string): any {
        switch (type.toLowerCase()) {
            case 'normal':
                return <NormalChip/>;
            case 'fire':
                return <FireChip/>;
            case 'water':
                return <WaterChip/>;
            case 'electric':
                return <ElectricChip/>;
            case 'grass':
                return <GrassChip/>;
            case 'ice':
                return <IceChip/>;
            case 'fighting':
                return <FightingChip/>;
            case 'poison':
                return <PoisonChip/>;
            case 'ground':
                return <GroundChip/>;
            case 'flying':
                return <FlyingChip/>;
            case 'psychic':
                return <PsychicChip/>;
            case 'bug':
                return <BugChip/>;
            case 'rock':
                return <RockChip/>;
            case 'ghost':
                return <GhostChip/>;
            case 'dragon':
                return <DragonChip/>;
            case 'dark':
                return <DarkChip/>;
            case 'steel':
                return <SteelChip/>;
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