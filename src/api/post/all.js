'use strict';

const utils = require('../utils/misc');
const aux = require('../utils/post_aux');
const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const DECIMAL_BASE = 10;

const NO_ELEMENT_SIZE = 0;

router.get('/poi_posts/:poiID/:offset/:limit', (req, res, next) => {
    const { poiID, offset, limit } = utils.trimStringProperties(req.params);

    if (isNaN(parseInt(poiID, DECIMAL_BASE)) || isNaN(parseInt(offset, DECIMAL_BASE))) {
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
    const { poiID, offset, limit, userID } = utils.trimStringProperties(req.params);

    if (isNaN(parseInt(poiID, DECIMAL_BASE)) ||
        isNaN(parseInt(offset, DECIMAL_BASE)) || typeof userID !== 'string') {
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

router.get('/post_poi/:offset/:limit', (req, res, next) => {
    const { offset, limit } = utils.trimStringProperties(req.params);

    if (isNaN(parseInt(offset, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    aux.handleGetPOIsPostRequest(req.params).
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

router.get('/post_poi/:userID/:offset/:limit', (req, res, next) => {
    const { offset, limit, userID } = utils.trimStringProperties(req.params);

    if (typeof userID !== 'string' ||
        isNaN(parseInt(offset, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    aux.handleGetPOIsPostRequest(req.params).
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

router.get('/post_poi/:userID/:lat/:lng/:offset/:limit', (req, res, next) => {
    const { offset, limit, userID, lat, lng } = utils.trimStringProperties(req.params);

    if (typeof userID !== 'string' ||
        isNaN(parseInt(offset, DECIMAL_BASE)) ||
        isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    aux.handleGetPOIsPostRequest(req.params).
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

router.get('/post_poi/:lat/:lng/:offset/:limit', (req, res, next) => {
    const { offset, limit, lat, lng } = utils.trimStringProperties(req.params);

    if (isNaN(parseInt(offset, DECIMAL_BASE)) ||
        isNaN(parseFloat(lat)) || isNaN(parseFloat(lng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    aux.handleGetPOIsPostRequest(req.params).
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
