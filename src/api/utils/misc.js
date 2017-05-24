/* eslint guard-for-in: "off" */
/* eslint no-prototype-builtins: "off" */

const DECIMAL_BASE = 10;
const NOT_FOUND = -1;
const NO_ELEMENT_SIZE = 0;
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
        if (!(toCamelCase(attribute) in newObject && newObject[toCamelCase(attribute)] !== null)) {
            newObject[toCamelCase(attribute)] = object[attribute];
        }
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
    if (objects && Array.isArray(objects)) {
        return objects.map(convertObjectToCamelCase);
    }

    return [];
};

/**
 * Returns the array in string form, as required by POSTGRESQL.
 * @param {Object[]} objects array with original objects
 *
 * @return {string} array in string form
 */
module.exports.convertArrayToString = (objects) => {
    let arrayString = '{';

    if (objects && objects.length) {
        let index = ZERO_INDEX;
        arrayString = `${arrayString}${objects[index++]}`;

        for (; index < objects.length; index++) {
            arrayString = `${arrayString}, ${objects[index]}`;
        }
    }

    return `${arrayString}}`;
};

/**
 * Ensures the resultList has an acceptable size and that all promise results are the ones expected.
 * @param {[][]} resultList list of results
 * @param {[]} acceptableLengths acceptable lengths of the result list
 * @param {boolean} containsLists tells if the result list contains lists
 *
 * @return {boolean} tells if the result list is valid
 */
module.exports.checkResultList = (resultList, acceptableLengths, containsLists = false) => {
    if (!resultList) {
        return false;
    }

    if (containsLists) {
        for (let index = 0; index < resultList.length; index++) {
            if (!(resultList[index] && resultList[index].length > NO_ELEMENT_SIZE)) {
                return false;
            }
        }
    }

    return acceptableLengths.indexOf(resultList.length) !== NOT_FOUND;
};

/**
 * Converts an array in string form into an array of integers.
 * @param {string} string array in string form
 *
 * @return {[]} the array of integers
 */
module.exports.convertStringToArray = (string) => {
    const array = [];

    if (string) {
        const elements = string.split(',');

        elements.forEach((element) => {
            array.push(parseInt(element, DECIMAL_BASE));
        });
    }

    return array;
};

/**
 * Trims the object's shallow string properties
 * @param {object} object the object to convert
 * @returns {{}} the new object having its shallow string properties trimmed
 */
module.exports.trimStringProperties = (object) => {
    const resultObject = {};
    Object.assign(resultObject, object);
    for (const property in resultObject) {
        if (resultObject.hasOwnProperty(property) && typeof resultObject[property] === 'string') {
            resultObject[property] = resultObject[property].trim();
        }
    }

    return resultObject;
};
