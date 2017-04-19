'use strict';

// Note regarding 'parseInt' function: Javascript supports 53bit integers

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;
const RATING_VALUES = [0, 1, 2, 3, 4, 5];
const VALUE_NOT_FOUND = -1;

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    poiDB.getPOIDetailByID(id).
    then((poi) => {
        if (poi && poi.length === 1) {
            res.json(poi[0]).end();
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
        if (result && result.length > 0) {
            res.json(result[0]).end();
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
        if (result && result.length > 0) {
            res.json(result[0]).end();
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
        if (results && results.length === 2 &&
            results[0] && results[0].length > 0 &&
            results[1] && results[1].length > 0) {

            return poiDB.getPOIRatingByUser(poiID, userID).then((result) => {
                if (result && result.length > 0) {
                    return poiDB.updatePOIRating(poiID, userID, rating);
                }

                return poiDB.addPOIRating(poiID, userID, rating);
            }).then((inserted) => {
                console.log(inserted);
                res.end();
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: '(userID, poiID) not found' }).
        end();
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
