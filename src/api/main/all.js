'use strict';

const utils = require('../utils/misc');
const validator = require('validator');

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;

const ONE_SIZE = 1;
const THREE_SIZE = 3;

router.get('/search', (req, res, next) => {
    let { query } = utils.trimStringProperties(req.query);

    query = typeof query === 'string' ? query.split(/\s+/).
    join(' & ') : '';

    if (validator.isEmpty(query)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB, routeDB, tagDB } = db;
    Promise.all([poiDB.searchPOI(query), routeDB.searchRoute(query), tagDB.searchTag(query)]).
    then((results) => {
        if (results && results.length === THREE_SIZE) {
            res.json({
                poi: utils.convertObjectsToCamelCase(results[ZERO_INDEX]),
                route: utils.convertObjectsToCamelCase(results[ONE_INDEX]),
                tag: utils.convertObjectsToCamelCase(results[TWO_INDEX])
            }).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});


router.get('/fortune', (req, res, next) => {
    const { fortuneCookieDB } = db;
    fortuneCookieDB.getRandomFortuneCookie().
    then((cookie) => {
        if (!cookie || typeof cookie !== 'object' || cookie.length < ONE_SIZE) {
            res.sendStatus(httpCodes.NO_CONTENT).end();

            return;
        }

        res.json({ fortune: cookie[ZERO_INDEX].description }).
        end();
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
