'use strict';

const utils = require('../../utils/misc');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

router.get('/available-roles', (req, res, next) => {
    const { rank } = req.auth;

    const { roleDB } = db;
    roleDB.getAvailableRoles(rank).
    then((results) => {
        res.json(utils.convertObjectsToCamelCase(results)).end();
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
