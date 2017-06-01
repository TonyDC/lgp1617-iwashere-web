'use strict';

// Note regarding 'parseInt' function: Javascript supports 53bit mantissa

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');
const aux = require('../utils/poi_aux');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const NO_ELEMENT_SIZE = 0;
const THREE_SIZE = 3;

router.get('/search', (req, res, next) => {
    let { query } = utils.trimStringProperties(req.query);
    if (!query || typeof query !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    query = query.trim().split(/\s+/).
    join(' & ');

    const { routeDB } = db;

    routeDB.searchRoute(query).then((results) => {
        if (results) {
            res.json(utils.convertObjectsToCamelCase(results)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/rating/:routeID/:userID', (req, res, next) => {
    const { routeID, userID } = utils.trimStringProperties(req.params);

    if (!routeID || !userID || typeof userID !== 'string' || isNaN(parseInt(routeID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { routeDB } = db;
    routeDB.getRatingByUserID(routeID, userID).
    then((result) => {
        if (result && result.length > NO_ELEMENT_SIZE) {
            res.json(result[ZERO_INDEX]).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/rating/:routeID', (req, res, next) => {
    const { routeID } = utils.trimStringProperties(req.params);

    if (!routeID || isNaN(parseInt(routeID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { routeDB } = db;
    routeDB.getRatingByRouteID(routeID).
    then((result) => {
        if (result && result.length > NO_ELEMENT_SIZE) {
            let routeRating = result[ZERO_INDEX];
            if (!routeRating.rating || !routeRating.ratings) {
                routeRating = {
                    rating: 0,
                    ratings: 0
                };
            }
            res.json(routeRating).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/:id', (req, res, next) => {
    const { id } = utils.trimStringProperties(req.params);
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { routeDB } = db;

    Promise.all([routeDB.getRouteDetailByID(id), routeDB.getTagsByRouteID(id), routeDB.getPOIsByRouteID(id)]).
    then((results) => {
        if (results && results.length === THREE_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {

            const route = utils.convertObjectToCamelCase(results[ZERO_INDEX][ZERO_INDEX]);
            route.tags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);
            route.pois = utils.convertObjectsToCamelCase(results[TWO_INDEX]);

            res.json(route).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/pois/:id', (req, res, next) => {
    const { id } = utils.trimStringProperties(req.params);
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { routeDB } = db;
    routeDB.getRouteDetailByID(id).
    then((routes) => {
        if (routes && routes.length > NO_ELEMENT_SIZE) {
            routeDB.getPOIsByRouteID(id).
            then((results) => {
                aux.handlePOIResults(results).
                then((poiList) => {
                    if (poiList.length === NO_ELEMENT_SIZE) {
                        res.sendStatus(httpCodes.NO_CONTENT).end();
                    } else {
                        res.json(poiList).end();
                    }
                });
            });
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
