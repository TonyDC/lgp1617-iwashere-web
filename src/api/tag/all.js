'use strict';

const utils = require('../utils/misc');

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const NO_ELEMENT_SIZE = 0;

router.get('/', (req, res, next) => {
    const { tagDB } = db;
    tagDB.getAllTags().
    then((results) => {
        if (results && results.length > NO_ELEMENT_SIZE) {
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
