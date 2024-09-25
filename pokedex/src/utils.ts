import {PokemonAbility} from "pokenode-ts";

/**
 * Turns input string into title cased string (where each word's first letter is a capital)
 * Removes all hyphens from the string and replaces them with spaces first
 */
function toTitleCase(str: string): string {
    return str.replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

/**
 * Turns the pokemon's id from PokeAPI into a 0 padded string (to 3 digits total length)
 * and adds a '#' to the front of it
 */
function toPokemonNumber(id: number): string {
    return '#' + id.toString().padStart(3, '0');
}

/**
 * Turns the height obtained from PokeAPI into more human-readable data, with units at the end
 * @param decimetres pokemon height in decimetres as gotten from PokeAPI
 */
function decimetresToHeightString(decimetres: number): string {
    const metres: number = decimetres/10;
    return metres + "m";
}

/**
 * Turns the weight obtained from PokeAPI into more human-readable data, with units at the end
 * @param hectograms pokemon weight in hectograms as gotten from PokeAPI
 */
function hectogramsToWeightString(hectograms: number): string {
    const metres: number = hectograms/10;
    return metres + "kg";
}

/**
 * Returns a string detailing either the pokemons first ability (if pokemon only has one) or the first and second
 * ability seperated by a slash (if pokemon has two). Title cases the pokemon abilities before returning them.
 * Does not return any pokemon hidden abilities
 * @param abilities list of PokemonAbility types in the pokemon's data
 */
function getPokemonAbilitiesString(abilities: PokemonAbility[]): string {
    // should always have a first ability
    const firstAbility: string = abilities.at(0)?.ability.name || '';
    // optionally have a second normal ability. Is not included here if it is a hidden ability
    let secondAbility: string | undefined;
    if (abilities.length > 1 && !abilities.at(1)?.is_hidden) {
        secondAbility = abilities.at(1)?.ability.name;
    }
    return (secondAbility ?
        toTitleCase(firstAbility) + '/' + toTitleCase(secondAbility) :
        toTitleCase(firstAbility));
}


/**
 * Returns a string detailing the pokemons hidden ability if present.
 * If no hidden ability saying 'None' as hidden ability
 * Title cases ability before returning it
 * @param abilities list of PokemonAbility types in the pokemon's data
 */
function getPokemonHiddenAbilityString(abilities: PokemonAbility[]): string {
    for (let i = 0; i < abilities.length; i++) {
        if (abilities.at(i)?.is_hidden) {
            const hiddenAbility: string = abilities.at(i)?.ability.name || '';
            return toTitleCase(hiddenAbility);
        }
    }
    return "None"
}

export {
    toTitleCase,
    toPokemonNumber,
    decimetresToHeightString,
    hectogramsToWeightString,
    getPokemonAbilitiesString,
    getPokemonHiddenAbilityString};