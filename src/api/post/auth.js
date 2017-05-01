'use strict';

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;

router.post('/', (req, res, next) => {
    const { poiID, description, tags} = req.body;

    if (!poiID || typeof description !== 'string' || !tags) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { postDB, userDB, poiDB } = db;
    Promise.all([userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)]).
    then((results) => {

        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            return Promise.all([postDB.createPost(description, poiID, userID),
                postDB.addPostTags[utils.convertArrayToString(tags)]]).
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
