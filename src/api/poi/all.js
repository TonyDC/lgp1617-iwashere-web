'use strict';

// Note regarding 'parseInt' function: Javascript supports 53bit mantissa

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');
const aux = require('../utils/poi_aux');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

const ZERO_RATING = 0;
const ONE_RATING = 1;
const TWO_RATING = 2;
const THREE_RATING = 3;
const FOUR_RATING = 4;
const FIVE_RATING = 5;
const RATING_VALUES = [ZERO_RATING, ONE_RATING, TWO_RATING, THREE_RATING, FOUR_RATING, FIVE_RATING];

const VALUE_NOT_FOUND = -1;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;

router.get('/search', (req, res, next) => {
    let { query } = req.query;
    let { lat, lng } = req.query;
    if (!query || typeof query !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    query = query.trim().split(/\s+/).
    join(' & ');

    const { poiDB } = db;

    lat = parseFloat(lat);
    lng = parseFloat(lng);

    if (!isNaN(lat) && !isNaN(lng)) {
        poiDB.searchNearbyPOI(query, lat, lng).
        then((results) => {
            if (results) {
                const response = {
                    results: results.map((entry) => {
                        return utils.convertObjectToCamelCase(entry);
                    }),
                    type: 'distance'
                };
                res.json(response).end();
            } else {
                res.sendStatus(httpCodes.NO_CONTENT).end();
            }
        }).
        catch((error) => {
            next(error);
        });
    } else {
        poiDB.searchPOI(query).then((results) => {
            if (results) {
                const response = {
                    results: results.map((entry) => {
                        return utils.convertObjectToCamelCase(entry);
                    }),
                    type: 'name'
                };
                res.json(response).end();
            } else {
                res.sendStatus(httpCodes.NO_CONTENT).end();
            }
        }).
        catch((error) => {
            next(error);
        });
    }
});

router.get('/media/:poiID', (req, res, next) => {
    const { poiID } = req.params;
    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;

    poiDB.getPOIAllMedia(poiID).
    then((media) => {
        if (media) {
            res.json(utils.convertObjectsToCamelCase(media)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });

});

router.get('/rating/:poiID/:userID', (req, res, next) => {
    const { poiID, userID } = req.params;

    if (!poiID || !userID || typeof userID !== 'string' || isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getPOIRatingByUser(poiID, userID).
    then((result) => {
        if (result && result.length > NO_ELEMENT_SIZE) {
            res.json(result[ZERO_INDEX]).end();
        } else {
            res.status(httpCodes.NO_CONTENT).json({ rating: 0 }).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/rating/:poiID', (req, res, next) => {
    const { poiID } = req.params;

    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getPOIRating(poiID).
    then((result) => {
        if (result && result.length > NO_ELEMENT_SIZE) {
            let poiRating = result[ZERO_INDEX];
            if (!poiRating.rating || !poiRating.ratings) {
                poiRating = {
                    rating: 0,
                    ratings: 0
                };
            }
            res.json(poiRating).end();
        } else {
            res.status(httpCodes.NO_CONTENT).
            json({
                rating: 0,
                ratings: 0
            }).
            end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.post('/rating', (req, res, next) => {
    const { userID, poiID, rating } = req.body;

    if (!poiID || !userID || typeof userID !== 'string' || !rating || RATING_VALUES.indexOf(rating) === VALUE_NOT_FOUND ||
        isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)]).
    then((results) => {
        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            return poiDB.addPOIRating(poiID, userID, rating).
            then(() => {
                res.end();
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: '(userID, poiID) not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/range/:minLat/:maxLat/:minLng/:maxLng', (req, res, next) => {
    const { minLat, maxLat, minLng, maxLng } = req.params;

    if (!minLat || !maxLat || !minLng || !maxLng ||
        isNaN(parseFloat(minLat)) || isNaN(parseFloat(maxLat)) || isNaN(parseFloat(minLng)) || isNaN(parseFloat(maxLng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getPOIsWithin(minLat, maxLat, minLng, maxLng).
    then((rows) => {
        if (rows) {
            res.json(utils.convertObjectsToCamelCase(rows)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;

    Promise.all([poiDB.getPOIDetailByID(id), poiDB.getPOITags(id)]).
    then((results) => {
        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {
            const poi = utils.convertObjectToCamelCase(results[ZERO_INDEX][ZERO_INDEX]);
            poi.tags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);

            res.json(poi).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/suggestions/:limit/:lat/:lng', (req, res, next) => {
    const { limit, lat, lng } = req.params;

    if (!limit || isNaN(parseInt(limit, DECIMAL_BASE)) || !lat || !lng ||
        isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getNearbyPOIs(lat, lng, limit).
    then((results) => {
        aux.handlePOIResults(results).
        then((suggestions) => {
            if (suggestions.length === NO_ELEMENT_SIZE) {
                res.sendStatus(httpCodes.NO_CONTENT).end();
            } else {
                res.json(suggestions).end();
            }
        });
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/suggestions/:limit', (req, res, next) => {
    const { limit } = req.params;

    if (!limit || isNaN(parseInt(limit, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();


        return;
    }

    const { poiDB } = db;
    poiDB.getTopRatedPOIs(limit).
    then((results) => {
        aux.handlePOIResults(results).
        then((suggestions) => {
            if (suggestions.length === NO_ELEMENT_SIZE) {
                res.sendStatus(httpCodes.NO_CONTENT).end();
            } else {
                res.json(suggestions).end();
            }
        });
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
