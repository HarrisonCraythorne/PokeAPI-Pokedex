/**
 * Turns input string into title cased string (where each word's first letter is a capital)
 */
function toTitleCase(str: string): string {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
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

export {toTitleCase, toPokemonNumber, decimetresToHeightString, hectogramsToWeightString};