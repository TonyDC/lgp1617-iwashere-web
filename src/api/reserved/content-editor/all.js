'use strict';

const utils = require('../../utils/misc');

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;

const THREE_SIZE = 3;

router.get('/search', (req, res, next) => {
    let { query } = req.query;
    if (!query || typeof query !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    query = query.trim().split(/\s+/).
    join(' & ');

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

module.exports = router;
