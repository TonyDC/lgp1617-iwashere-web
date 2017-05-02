'use strict';

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');
const DECIMAL_BASE = 10;

const NO_ELEMENT_SIZE = 0;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const ONE_SIZE = 1;
const TWO_SIZE = 2;
const THREE_SIZE = 3;

router.post('/', (req, res, next) => {
    console.error('chech-1');
    const { poiID, description, tags } = req.body;

    if (!poiID || typeof description !== 'string' || !tags) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { postDB, userDB, poiDB } = db;
    Promise.all([userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)]).
    then((results) => {
console.error('chech');
        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            console.error('chech2');

            return Promise.all([postDB.createPost(description, poiID, userID),
                postDB.addPostTags[utils.convertListToArray(tags)]]).
            then((creationResults) => {
                console.error('chech3');
                if (results && results.length === TWO_SIZE &&
                    results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {
                    res.json(utils.convertObjectToCamelCase(creationResults[ZERO_INDEX])).end();
                } else {
                    res.status(httpCodes.BAD_REQUEST).json({ message: 'unknown error' }).
                    end();
                }
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

router.put('/', (req, res, next) => {
    const { postID } = req.body;

    if (!postID) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { postDB } = db;
    postDB.getUserPost(userID, postID).
    then((results) => {

        if (results && results.length === ONE_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {

            return postDB.setPostDeleted(userID, postID).
            then(() => {
                res.end();
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: '(userID, postID) not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.post('/like', (req, res, next) => {
    const { postID, liked } = req.body;
    if (!postID || isNaN(parseInt(postID, DECIMAL_BASE)) || typeof liked !== 'boolean') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { postDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), postDB.getPostById(postID), postDB.getPostLike(postID, userID)]).
    then((results) => {

        if (results && results.length === THREE_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            if (results[TWO_INDEX] && results[TWO_INDEX].length > NO_ELEMENT_SIZE) {

                return postDB.updatePostLike(postID, userID, liked).then(() => {
                    return postDB.getPostLikes(utils.convertArrayToString([postID])).
                    then((postLikes) => {
                        res.json(utils.convertObjectToCamelCase(postLikes[ZERO_INDEX])).end();
                    });
                });
            }

            return postDB.addPostLike(postID, userID).then(() => {
                return postDB.getPostLikes(utils.convertArrayToString([postID])).
                then((postLikes) => {
                    res.json(utils.convertObjectToCamelCase(postLikes[ZERO_INDEX])).end();
                });
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: '(userID, postID) not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
