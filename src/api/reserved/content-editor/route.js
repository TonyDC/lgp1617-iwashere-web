'use strict';

const utils = require('../../utils/misc');
const aux = require('../../utils/poi_aux');

const httpCodes = require('http-status-codes');
const validator = require('validator');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const ONE_SIZE = 1;
const TWO_SIZE = 2;

// Create new Route
router.post('/', (req, res, next) => {
    const { name, description, tags, pois, context } = utils.trimStringProperties(req.body);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    if (typeof userID !== 'string' || validator.isEmpty(userID) || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || !tags || !pois || pois.length < ONE_SIZE ||
        typeof context === 'undefined' || validator.isEmpty(`${context}`)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, context),
        poiDB.getPOIsByID(utils.convertArrayToString(pois))];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true) &&
            results[ONE_INDEX].length === pois.length) {

            return routeDB.createRoute(name, description, userID, context).
            then((routeCreationResults) => {
                if (utils.checkResultList(routeCreationResults, [ONE_SIZE])) {
                    const { routeId } = utils.convertObjectToCamelCase(routeCreationResults[ZERO_INDEX]);
                    const poisList = pois.map((poiId) => {
                        return parseInt(poiId, DECIMAL_BASE);
                    });
                    const tagsList = tags.map((tagId) => {
                        return parseInt(tagId, DECIMAL_BASE);
                    });
                    const createAdditionalRouteInfo = [routeDB.setRoutePOIs(routeId, poisList)];
                    if (tags.length > NO_ELEMENT_SIZE) {
                        createAdditionalRouteInfo.push(routeDB.setRouteTags(routeId, tagsList));
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
    const { routeId, name, description, tags, pois, context } = utils.trimStringProperties(req.body);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    if (typeof userID !== 'string' || validator.isEmpty(userID) || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || !tags || !pois || pois.length < ONE_SIZE ||
        typeof routeId === 'undefined' || validator.isEmpty(`${routeId}`) ||
        typeof context === 'undefined' || validator.isEmpty(`${context}`)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, context),
        poiDB.getPOIsByID(utils.convertArrayToString(pois)), routeDB.getRouteDetailByID(routeId, true)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true) &&
            results[ONE_INDEX].length === pois.length) {

            return routeDB.updateRoute(routeId, name, description).
            then((routeUpdateResults) => {
                if (utils.checkResultList(routeUpdateResults, [ONE_SIZE])) {
                    const poisList = pois.map((poiId) => {
                        return parseInt(poiId, DECIMAL_BASE);
                    });
                    const tagsList = tags.map((tagId) => {
                        return parseInt(tagId, DECIMAL_BASE);
                    });

                    const updateAdditionalRouteInfo = [routeDB.setRoutePOIs(routeId, poisList)];
                    if (tags.length > NO_ELEMENT_SIZE) {
                        updateAdditionalRouteInfo.push(routeDB.setRouteTags(routeId, tagsList));
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

// Set Route deleted
router.post('/:routeID/:deleted', (req, res, next) => {
    const { context } = utils.trimStringProperties(req.body);
    const { routeID, deleted } = utils.trimStringProperties(req.params);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    if (typeof userID !== 'string' || validator.isEmpty(userID) ||
        typeof routeID === 'undefined' || validator.isEmpty(`${routeID}`) ||
        typeof context === 'undefined' || validator.isEmpty(`${context}`)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, context),
        routeDB.getRouteDetailByID(routeID, true)];
    Promise.all(primaryChecks).
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

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { routeDB } = db;

    Promise.all([routeDB.getRouteDetailByID(id, true), routeDB.getTagsByRouteID(id)]).
    then((results) => {
        if (utils.checkResultList(results, [TWO_SIZE], true)) {

            const route = utils.convertObjectToCamelCase(results[ZERO_INDEX][ZERO_INDEX]);
            route.tags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);

            res.json(route).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/pois/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { routeDB } = db;
    routeDB.getRouteDetailByID(id, true).
    then((routes) => {
        if (routes && routes.length > NO_ELEMENT_SIZE) {
            routeDB.getPOIsByRouteID(id, true).
            then((results) => {
                aux.handlePOIResults(results).
                then((poiList) => {
                    if (poiList.length === NO_ELEMENT_SIZE) {
                        res.sendStatus(httpCodes.NO_CONTENT).end();
                    } else {
                        res.json(poiList).end();
                    }
                });
            });
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
