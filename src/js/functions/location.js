/**
 * Polyfill for 'navigator.geolocation.getCurrentPosition'
 * @param geoOptions options for getting the current location
 * @returns {Promise}
 */
function processLocation(geoOptions) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, (error) => {
            reject(error);
        }, geoOptions);
    });
}

export { processLocation };
