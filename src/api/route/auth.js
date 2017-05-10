'use strict';

const express = require('express');
const router = express.Router();

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

const ZERO_RATING = 0;
const ONE_RATING = 1;
const TWO_RATING = 2;
const THREE_RATING = 3;
const FOUR_RATING = 4;
const FIVE_RATING = 5;
const RATING_VALUES = [ZERO_RATING, ONE_RATING, TWO_RATING, THREE_RATING, FOUR_RATING, FIVE_RATING];

const VALUE_NOT_FOUND = -1;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const ONE_SIZE = 1;
const TWO_SIZE = 2;

router.post('/', (req, res, next) => {
    const { name, description, pois, tags } = req.body;
    const userID = req.auth.token.uid;

    if (!userID || typeof userID !== 'string' || !name || typeof name !== 'string' || !tags || !tags.length ||
        !description || typeof description !== 'string' || !pois || !pois.length > NO_ELEMENT_SIZE) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    console.error(pois);
    console.error(tags);

    const { userDB, poiDB, routeDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID), poiDB.getPOIsByID(pois)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {

            return routeDB.createRoute(name, description, userID).
            then((routeCreationResults) => {
                if (utils.checkResultList(routeCreationResults, [ONE_SIZE], true)) {
                    const { routeId } = utils.convertObjectToCamelCase(routeCreationResults[ZERO_INDEX][ZERO_INDEX]);
                    const createAdditionalRouteInfo = [routeDB.setRoutePOIs(routeId, tags)];
                    if (tags.length > NO_ELEMENT_SIZE) {
                        createAdditionalRouteInfo.push(routeDB.setRouteTags(routeId, tags));
                    }

                    return Promise.all(createAdditionalRouteInfo).
                    then((additionalPostInfo) => {
                        if (utils.checkResultList(additionalPostInfo, [createAdditionalRouteInfo.length], true)) {

                            return res.json({ routeId }).end();
                        }

                        res.status(httpCodes.BAD_REQUEST).json({ message: 'error adding tags or pois to route' }).
                        end();

                        return null;
                    });
                }

                res.status(httpCodes.BAD_REQUEST).json({ message: 'error creating route' }).
                end();

                return null;
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: 'content_editor_id or poi_id not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.put('/', (req, res, next) => {
    const { routeID, name, description, pois, tags } = req.body;
    const userID = req.auth.token.uid;

    if (!routeID || !userID || typeof userID !== 'string' || !name || typeof name !== 'string' || !tags || !tags.length ||
        !description || typeof description !== 'string' || !pois || !pois.length > NO_ELEMENT_SIZE) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    console.error(pois);
    console.error(tags);

    const { userDB, poiDB, routeDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID),
        poiDB.getPOIsByID(pois), routeDB.getContentEditorRoute(userID, routeID)];

    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {

            return routeDB.updateRoute(routeID, name, description).
            then((routeUpdateResults) => {
                if (utils.checkResultList(routeUpdateResults, [ONE_SIZE], true)) {
                    const { routeId } = utils.convertObjectToCamelCase(routeUpdateResults[ZERO_INDEX][ZERO_INDEX]);
                    const updateAdditionalRouteInfo = [routeDB.setRoutePOIs(routeId, tags)];
                    if (tags.length > NO_ELEMENT_SIZE) {
                        updateAdditionalRouteInfo.push(routeDB.setRouteTags(routeId, tags));
                    }

                    return Promise.all(updateAdditionalRouteInfo).
                    then((additionalPostInfo) => {
                        if (utils.checkResultList(additionalPostInfo, [updateAdditionalRouteInfo.length], true)) {

                            return res.json({ routeId }).end();
                        }

                        res.status(httpCodes.BAD_REQUEST).json({ message: 'error adding tags or pois to route' }).
                        end();

                        return null;
                    });
                }

                res.status(httpCodes.BAD_REQUEST).json({ message: 'error updating route' }).
                end();

                return null;
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: 'content_editor_id, route_id or poi_id not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.delete('/:routeID/:deleted', (req, res, next) => {
    const { routeID, deleted } = req.params;
    if (!routeID || typeof deleted === 'undefined') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { routeDB, userDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID),
        routeDB.getRouteDetailByID(routeID)];
    primaryChecks.
    then((results) => {

        if (utils.checkResultList(results, [primaryChecks.length], true)) {

            return routeDB.setRouteDeleted(routeID, deleted).
            then(() => {
                res.end();
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: '(userID, routeID) not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.post('/rating', (req, res, next) => {
    const { routeID, rating } = req.body;
    if (!routeID || !rating || RATING_VALUES.indexOf(rating) === VALUE_NOT_FOUND ||
        isNaN(parseInt(routeID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { routeDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), routeDB.getRouteDetailByID(routeID)]).
    then((results) => {
        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            return routeDB.addRouteRating(routeID, userID, rating).
            then(() => {
                res.end();
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: '(userID, routeID) not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
