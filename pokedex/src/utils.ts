import {PokemonAbility, PokemonClient, PokemonType} from "pokenode-ts";

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

async function getPokemonWeakness(types: PokemonType[]): Promise<string[]> {
    const api = new PokemonClient();
    try {
        let resist: string[] = [];
        let weak: string[] = [];
        let immune: string[] = [];

        await Promise.all(types.map(async (type: PokemonType) => {
            const typeResponse = await api.getTypeByName(type.type.name);

            if (typeResponse && typeResponse.damage_relations) {
                // Push values to immune
                typeResponse.damage_relations.no_damage_from.forEach((item: { name: string }) => {
                    immune.push(item.name);
                });

                // Push values to resist
                typeResponse.damage_relations.half_damage_from.forEach((item: { name: string }) => {
                    resist.push(item.name);
                });

                // Push values to weak
                typeResponse.damage_relations.double_damage_from.forEach((item: { name: string }) => {
                    weak.push(item.name);
                });
            }
        }));

        // Create a Set to filter out duplicates
        return Array.from(new Set(
            weak.filter((type: string) => {
                return !resist.includes(type) && !immune.includes(type);
            })
        ));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export {
    toTitleCase,
    toPokemonNumber,
    decimetresToHeightString,
    hectogramsToWeightString,
    getPokemonAbilitiesString,
    getPokemonHiddenAbilityString,
    getPokemonWeakness};