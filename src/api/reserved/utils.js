'use strict';

const express = require('express');
const router = express.Router();

const httpCodes = require('http-status-codes');

const db = root_require('src/db/query');
const utils = require('../utils/misc');

const NO_ELEMENTS = 0;

const CONTENT_EDITOR_RANK = 2;

router.get('/user-type', (req, res, next) => {
    const { uid } = req.auth.token;
    if (!uid || typeof uid !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB } = db;
    userContextDB.getContextsByUserIDAndWithMinRank(uid, CONTENT_EDITOR_RANK).
    then((results) => {
        if (results && results.length > NO_ELEMENTS) {
            res.json(utils.convertObjectsToCamelCase(results)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
