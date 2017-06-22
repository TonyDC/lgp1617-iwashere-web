const utils = require('./misc');
const db = root_require('src/db/query');

const NO_ELEMENT_SIZE = 0;
const ZERO_RATING = 0;

/**
 * Send POI suggestions.
 * @param {Object[]} results list of pois
 *
 * @return {Object}
 */
module.exports.handlePOIResults = (results) => {

    return new Promise((fulfill, reject) => {
        const poisList = utils.convertObjectsToCamelCase(results);
        const poiIds = [];
        poisList.forEach((poi) => {
            if (!poi.rating) {
                poi.rating = 0;
            }
            poiIds.push(poi.poiId);
        });

        if (poiIds.length === NO_ELEMENT_SIZE) {
            fulfill([]);

            return;
        }

        const { poiDB } = db;
        poiDB.getPOIMedia(utils.convertArrayToString(poiIds)).
        then((media) => {
            const mediaList = utils.convertObjectsToCamelCase(media);

            poisList.forEach((poi) => {
                poi.media = mediaList.filter((mediaItem) => {
                    return mediaItem.poiId === poi.poiId;
                });

                if (poi.rating >= ZERO_RATING) {
                    poi.rating = parseFloat(poi.rating);
                } else {
                    poi.rating = ZERO_RATING;
                }
            });

            fulfill(poisList);
        }).
        catch((error) => {
            reject(error);
        });
    });
};
