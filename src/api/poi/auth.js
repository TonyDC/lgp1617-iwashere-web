'use strict';

const express = require('express');
const router = express.Router();

const httpCodes = require('http-status-codes');
const db = root_require('src/db/query');
const utils = require('../utils/misc');

const ZERO_RATING = 0;
const ONE_RATING = 1;
const TWO_RATING = 2;
const THREE_RATING = 3;
const FOUR_RATING = 4;
const FIVE_RATING = 5;
const RATING_VALUES = [ZERO_RATING, ONE_RATING, TWO_RATING, THREE_RATING, FOUR_RATING, FIVE_RATING];

const DECIMAL_BASE = 10;
const VALUE_NOT_FOUND = -1;
const TWO_SIZE = 2;

router.post('/rating', (req, res, next) => {
    const { poiID, rating } = utils.trimStringProperties(req.body);
    if (RATING_VALUES.indexOf(rating) === VALUE_NOT_FOUND ||
        isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { poiDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)]).
    then((results) => {
        if (utils.checkResultList(results, [TWO_SIZE], true)) {
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

module.exports = router;
