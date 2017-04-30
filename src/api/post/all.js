'use strict';

const utils = require('../utils/misc');
const aux = require('../utils/post_aux');

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;
const THREE_SIZE = 3;

router.get('/poi_posts/:poiID/:offset/:limit', (req, res, next) => {
    const { poiID, offset, limit } = req.params;

    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE)) || !limit || !offset || isNaN(parseInt(offset, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    aux.handleGetPOIPostsRequest(req.params).
    then((posts) => {
        if (posts.length === NO_ELEMENT_SIZE) {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        } else {
            res.json(posts).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/poi_posts/:userID/:poiID/:offset/:limit', (req, res, next) => {
    const { poiID, offset, limit, userID } = req.params;

    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE)) || !limit || !offset ||
        isNaN(parseInt(offset, DECIMAL_BASE)) || !userID || typeof userID !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    aux.handleGetPOIPostsRequest(req.params).
    then((posts) => {
        if (posts.length === NO_ELEMENT_SIZE) {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        } else {
            res.json(posts).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});


router.post('/like', (req, res, next) => {
    const { userID, postID, liked } = req.body;

    if (!postID || !userID || typeof userID !== 'string' || typeof liked !== 'boolean') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

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
