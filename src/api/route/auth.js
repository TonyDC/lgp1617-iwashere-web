'use strict';

const express = require('express');
const router = express.Router();

const utils = require('../utils/misc');
const httpCodes = require('http-status-codes');
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
const TWO_SIZE = 2;

router.post('/rating', (req, res, next) => {
    const { routeID, rating } = utils.trimStringProperties(req.body);
    if (!routeID || !rating || RATING_VALUES.indexOf(rating) === VALUE_NOT_FOUND ||
        isNaN(parseInt(routeID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { routeDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), routeDB.getRouteDetailByID(routeID)]).
    then((results) => {
        if (utils.checkResultList(results, [TWO_SIZE], true)) {

            return routeDB.addRouteRating(routeID, userID, rating).
            then(() => {
                res.end();
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: '(userID, routeID) not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
