'use strict';

const utils = require('../../utils/misc');

const httpCodes = require('http-status-codes');
const validator = require('validator');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const ONE_SIZE = 1;

// Create new Route
router.post('/', (req, res, next) => {
    const { name, description, tags, pois, context } = utils.trimStringProperties(req.body);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    console.error(req.body);
    if (typeof userID !== 'string' || validator.isEmpty(userID) || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || !tags || !pois || pois.length < ONE_SIZE ||
        typeof context !== 'string' || validator.isEmpty(context)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();
console.error('here');
        return;
    }

    const { userContextDB, poiDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, context), poiDB.getPOIsByID(pois)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true) &&
            results[ONE_INDEX].length === pois.length) {

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

// Update Route
router.put('/', (req, res, next) => {
    const { routeID, name, description, tags, pois, context } = utils.trimStringProperties(req.body);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    console.error(req.body);
    if (typeof userID !== 'string' || validator.isEmpty(userID) || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || !tags || !pois || pois.length < ONE_SIZE ||
        typeof context !== 'string' || validator.isEmpty(context)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();
        console.error('here');
        return;
    }

    const { userContextDB, poiDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, context),
        poiDB.getPOIsByID(pois), routeDB.getContentEditorRoute(userID, routeID)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true) &&
            results[ONE_INDEX].length === pois.length) {

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

// Set Route delted
router.post('/:routeID/:deleted', (req, res, next) => {
    const { routeID, deleted } = req.params;
    if (!routeID || typeof deleted === 'undefined') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { routeDB, userDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID),
        routeDB.getRouteDetailByID(routeID, true)];
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
module.exports = router;
