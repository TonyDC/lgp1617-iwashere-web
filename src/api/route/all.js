'use strict';

// Note regarding 'parseInt' function: Javascript supports 53bit mantissa

const httpCodes = require('http-status-codes');
const utils = require('../utils/camelCase');

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

router.get('/rating/:routeID/:userID', (req, res, next) => {
    const { routeID, userID } = req.params;

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
    const { routeID } = req.params;

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

// TODO
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

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { routeDB } = db;

    Promise.all([routeDB.getRouteDetailByID(id), routeDB.getTagsByRouteID(id)]).
    then((results) => {
        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {

            const route = utils.convertObjectToCamelCase(results[ZERO_INDEX][ZERO_INDEX]);
            route.tags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);

            res.json(route).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
