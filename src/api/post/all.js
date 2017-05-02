'use strict';

const aux = require('../utils/post_aux');

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const DECIMAL_BASE = 10;

const NO_ELEMENT_SIZE = 0;

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

module.exports = router;
