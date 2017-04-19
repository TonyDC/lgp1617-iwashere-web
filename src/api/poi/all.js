'use strict';

// Note regarding 'parseInt' function: Javascript supports 53bit integers

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;
const ZERO_RATING = 0;
const ONE_RATING = 0;
const TWO_RATING = 0;
const THREE_RATING = 0;
const FOUR_RATING = 0;
const FIVE_RATING = 0;
const RATING_VALUES = [ZERO_RATING, ONE_RATING, TWO_RATING, THREE_RATING, FOUR_RATING, FIVE_RATING];
const VALUE_NOT_FOUND = -1;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 0;

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getPOIDetailByID(id).
    then((poi) => {
        if (poi && poi.length > NO_ELEMENT_SIZE) {
            res.json(poi[ZERO_INDEX]).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});


router.get('/media/:poiID', (req, res, next) => {
    const { poiID } = req.params;
    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;

    poiDB.getMediaFromPOI(poiID).
    then((media) => {
        if (media) {
            res.json(media).end();
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
            res.sendStatus(httpCodes.NO_CONTENT).end();
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
            res.json(result[ZERO_INDEX]).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.post('/rating', (req, res, next) => {
    const { userID, poiID, rating } = req.body;

    if (!poiID || !userID || !rating || RATING_VALUES.indexOf(rating) === VALUE_NOT_FOUND || typeof userID !== 'string' || isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)]).
    then((results) => {
        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            return poiDB.getPOIRatingByUser(poiID, userID).then((result) => {
                if (result && result.length > NO_ELEMENT_SIZE) {
                    return poiDB.updatePOIRating(poiID, userID, rating);
                }

                return poiDB.addPOIRating(poiID, userID, rating);
            }).
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
    poiDB.getPOIsWithinWindow(minLat, maxLat, minLng, maxLng).
    then((rows) => {
        if (rows) {
            res.json(rows).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
