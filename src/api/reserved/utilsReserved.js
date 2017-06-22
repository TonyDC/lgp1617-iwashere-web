'use strict';

const express = require('express');
const router = express.Router();

const httpCodes = require('http-status-codes');

const db = root_require('src/db/query');
const utils = require('../utils/misc');

const NO_ELEMENTS = 0;
const NOT_FOUND = -1;

router.get('/child-types', (req, res, next) => {
    const { contextID, token } = req.auth;
    const { uid } = token;
    if (!uid || typeof uid !== 'string' || ['string', 'number'].indexOf(typeof contextID) === NOT_FOUND) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB } = db;
    userContextDB.getChildContexts(contextID).
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
