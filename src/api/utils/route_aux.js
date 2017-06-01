const utils = require('./misc');
const db = root_require('src/db/query');

const DECIMAL_BASE = 10;
const NO_ELEMENT_SIZE = 0;

/**
 *
 * @param {Object[]} results list of pois
 *
 * @return {Object}
 */
module.exports.setAdditionalRouteInfo = (routeId, pois, tags) => {

    return new Promise((fulfill, reject) => {

        const poisList = pois.map((poiId) => {
            return parseInt(poiId, DECIMAL_BASE);
        });
        const tagsList = tags.map((tagId) => {
            return parseInt(tagId, DECIMAL_BASE);
        });

        const { routeDB } = db;
        const createAdditionalRouteInfo = [routeDB.setRoutePOIs(routeId, poisList)];
        if (tagsList.length > NO_ELEMENT_SIZE) {
            createAdditionalRouteInfo.push(routeDB.setRouteTags(routeId, tagsList));
        }

        return Promise.all(createAdditionalRouteInfo).
        then((additionalInfo) => {
            if (utils.checkResultList(additionalInfo, [createAdditionalRouteInfo.length], true)) {
                fulfill();
            } else {
                reject(new Error('error adding tags or pois to route'));
            }
        }).
        catch((error) => {
            reject(error);
        });
    });
};
