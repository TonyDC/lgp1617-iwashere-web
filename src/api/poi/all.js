'use strict';

// Note regarding 'parseInt' function: Javascript supports 53bit mantissa
const httpCodes = require('http-status-codes');
const validator = require('validator');
const utils = require('../utils/misc');
const aux = require('../utils/poi_aux');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;

router.get('/search', (req, res, next) => {
    let { query } = utils.trimStringProperties(req.query);
    let { lat, lng } = utils.trimStringProperties(req.query);
    if (typeof query !== 'string' || validator.isEmpty(query) || (typeof lat === 'string' && !validator.isDecimal(lat)) || (typeof lat === 'string' && !validator.isDecimal(lng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    query = query.split(/\s+/).
    join(' & ');

    const { poiDB } = db;

    lat = parseFloat(lat);
    lng = parseFloat(lng);

    let promise = null;

    if (!isNaN(lat) && !isNaN(lng)) {
        promise = poiDB.searchNearbyPOI(query, lat, lng).
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
        });
    } else {
        promise = poiDB.searchPOI(query).then((results) => {
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
        });
    }

    promise.catch((error) => {
        next(error);
    });
});

router.get('/media/:poiID', (req, res, next) => {
    const { poiID } = utils.trimStringProperties(req.params);
    if (isNaN(parseInt(poiID, DECIMAL_BASE))) {
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
    const { poiID, userID } = utils.trimStringProperties(req.params);
    if (typeof userID !== 'string' || isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getPOIRatingByUser(poiID, userID).
    then((result) => {
        if (result && result.length > NO_ELEMENT_SIZE) {
            res.json(result[ZERO_INDEX]).end();
        } else {
            res.status(httpCodes.NO_CONTENT).
            json({ rating: 0 }).
            end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/rating/:poiID', (req, res, next) => {
    const { poiID } = utils.trimStringProperties(req.params);
    if (isNaN(parseInt(poiID, DECIMAL_BASE))) {
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

router.get('/range/:minLat/:maxLat/:minLng/:maxLng', (req, res, next) => {
    const { minLat, maxLat, minLng, maxLng } = utils.trimStringProperties(req.params);
    if (isNaN(parseFloat(minLat)) || isNaN(parseFloat(maxLat)) || isNaN(parseFloat(minLng)) || isNaN(parseFloat(maxLng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getPOIsWithin(minLat, maxLat, minLng, maxLng).
    then((rows) => {
        aux.handlePOIResults(rows).
        then((pois) => {
            res.json(pois).end();
        });
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/suggestions/:limit/:lat/:lng', (req, res, next) => {
    const { limit, lat, lng } = utils.trimStringProperties(req.params);
    if (isNaN(parseInt(limit, DECIMAL_BASE)) ||
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
    const { limit } = utils.trimStringProperties(req.params);
    if (isNaN(parseInt(limit, DECIMAL_BASE))) {
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

router.get('/types', (req, res, next) => {
    const { poiDB } = db;
    poiDB.getAllPOITypes().
    then((types) => {
        if (types) {
            res.json(utils.convertObjectsToCamelCase(types)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

// NOTE: this endpoint definition must be the last one, as the placeholder may conflict with the previous endpoints.
// Endpoints are visited taking into consideration the order they are defined.
router.get('/:id', (req, res, next) => {
    const { id } = utils.trimStringProperties(req.params);
    if (isNaN(parseInt(id, DECIMAL_BASE))) {
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

module.exports = router;
