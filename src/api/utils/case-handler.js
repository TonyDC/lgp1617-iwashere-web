const ZERO_INDEX = 0;
const ONE_INDEX = 1;

/**
 * Parse and convert an attribute string to camel case.
 * @param {string} attribute the attribute to convert
 *
 * @return {string} the new attribute
 */
function toCamelCase(attribute) {
    const attributeParsed = attribute.split('.');

    let cleanAttribute = attributeParsed[attributeParsed.length - ONE_INDEX];

    cleanAttribute = cleanAttribute.split('_').map((word) => {
        return word.charAt(ZERO_INDEX).toUpperCase() + word.slice(ONE_INDEX);
    }).
    join('');

    return cleanAttribute.charAt(ZERO_INDEX).toLowerCase() + cleanAttribute.slice(ONE_INDEX);
}

/**
 * Returns a copy of the object with camel case attributes.
 * @param {Object} object original object
 *
 * @return {Object} with camel case attributes
 */
function convertObjectToCamelCase(object) {
    const newObject = {};

    for (const attribute in object) {
        newObject[toCamelCase(attribute)] = object[attribute];
    }

    return newObject;
}

/**
 * Returns a copy of the object with camel case attributes.
 * @param {Object} object original object
 *
 * @return {Object} with camel case attributes
 */
module.exports.convertObjectToCamelCase = (object) => {
    return convertObjectToCamelCase(object);
};

/**
 * Returns a copy of the array with its objects with camel case attributes.
 * @param {Object[]} objects array with original objects
 *
 * @return {Object[]} array with converted objects
 */
module.exports.convertObjectsToCamelCase = (objects) => {
    return objects.map(convertObjectToCamelCase);
};
