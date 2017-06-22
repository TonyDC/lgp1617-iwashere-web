'use strict';

const utils = require('../../utils/misc');
const poiAux = require('../../utils/poi_aux');
const routeAux = require('../../utils/route_aux');
const httpCodes = require('http-status-codes');
const validator = require('validator');
const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const NOT_FOUND = -1;
const DECIMAL_BASE = 10;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const ONE_SIZE = 1;
const TWO_SIZE = 2;

// Create new Route
router.post('/', (req, res, next) => {
    const { name, description, tags, pois, contextId } = utils.trimStringProperties(req.body);
    const tagList = utils.parseJSON(tags);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    if (typeof userID !== 'string' || validator.isEmpty(userID) || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || !pois || pois.length < ONE_SIZE ||
        typeof contextId === 'undefined' || validator.isEmpty(`${contextId}`)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, contextId),
        poiDB.getPOIsByID(utils.convertArrayToString(pois))];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true) &&
            results[ONE_INDEX].length === pois.length) {

            return routeDB.createRoute(name, description, userID, contextId).
            then((routeCreationResults) => {
                if (utils.checkResultList(routeCreationResults, [ONE_SIZE])) {
                    const { routeId } = utils.convertObjectToCamelCase(routeCreationResults[ZERO_INDEX]);

                    return routeAux.setAdditionalRouteInfo(routeId, pois, tagList).
                    then(() => {
                        res.json({ routeId }).end();
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
    const { routeId, name, description, tags, pois, contextId } = utils.trimStringProperties(req.body);
    const tagList = utils.parseJSON(tags);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    if (typeof userID !== 'string' || validator.isEmpty(userID) || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || !pois || pois.length < ONE_SIZE ||
        typeof routeId === 'undefined' || validator.isEmpty(`${routeId}`) ||
        typeof contextId === 'undefined' || validator.isEmpty(`${contextId}`)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, contextId),
        poiDB.getPOIsByID(utils.convertArrayToString(pois)), routeDB.getRouteDetailByID(routeId, true)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true) &&
            results[ONE_INDEX].length === pois.length) {

            return routeDB.updateRoute(routeId, name, description, contextId).
            then((routeUpdateResults) => {
                if (utils.checkResultList(routeUpdateResults, [ONE_SIZE])) {

                    return routeAux.setAdditionalRouteInfo(routeId, pois, tagList).
                    then(() => {
                        res.json({ routeId }).end();
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
router.post('/:routeID', (req, res, next) => {
    const { contextId, deleted } = utils.trimStringProperties(req.body);
    const { routeID } = utils.trimStringProperties(req.params);
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    if (typeof userID !== 'string' || validator.isEmpty(userID) || typeof deleted === 'undefined' ||
        typeof routeID === 'undefined' || validator.isEmpty(`${routeID}`) ||
        typeof contextId === 'undefined' || validator.isEmpty(`${contextId}`)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, routeDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, contextId),
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

router.get('/pois/:id', (req, res, next) => {
    const { id } = utils.trimStringProperties(req.params);
    const { contextID: userContext } = req.auth;

    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, routeDB } = db;
    routeDB.getRouteDetailByID(id, true).
    then((routes) => {
        if (routes && routes.length > NO_ELEMENT_SIZE) {
            const route = utils.convertObjectToCamelCase(routes[ZERO_INDEX]);

            return userContextDB.getChildContexts(userContext, route.contextId).
            then((contextCheck) => {
                if (!route.deleted || (contextCheck && contextCheck.length > NO_ELEMENT_SIZE)) {
                    return routeDB.getPOIsByRouteID(id, true).then((results) => {
                        return poiAux.handlePOIResults(results).then((poiList) => {
                            if (poiList.length === NO_ELEMENT_SIZE) {
                                res.sendStatus(httpCodes.NO_CONTENT).end();
                            } else {
                                res.json(poiList).end();
                            }
                        });
                    });
                }
                res.sendStatus(httpCodes.UNAUTHORIZED).end();

                return null;
            });
        }

        res.sendStatus(httpCodes.NO_CONTENT).end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/search', (req, res, next) => {
    let { query } = utils.trimStringProperties(req.query);
    const { contextID: userContext } = req.auth;

    if (!query || typeof query !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    query = query.trim().split(/\s+/).
    join(' & ');

    const { userContextDB, routeDB } = db;

    Promise.all([routeDB.searchRoute(query, true), userContextDB.getChildContexts(userContext)]).
    then((results) => {
        if (utils.checkResultList(results, [TWO_SIZE], true)) {
            const userContexts = utils.convertObjectsToCamelCase(results[ONE_INDEX]).map((context) => {
                return context.contextId;
            });
            const routes = utils.convertObjectsToCamelCase(results[ZERO_INDEX]).filter((route) => {
                return userContexts.indexOf(route.contextId) !== NOT_FOUND;
            });

            res.json(routes).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

router.get('/:id', (req, res, next) => {
    const { id } = utils.trimStringProperties(req.params);
    const { contextID: userContext } = req.auth;

    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, routeDB } = db;

    Promise.all([routeDB.getRouteDetailByID(id, true), routeDB.getTagsByRouteID(id)]).
    then((results) => {
        if (utils.checkResultList(results, [TWO_SIZE]) && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {
            const route = utils.convertObjectToCamelCase(results[ZERO_INDEX][ZERO_INDEX]);
            route.tags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);

            return userContextDB.verifyContextUnderUserJurisdiction(userContext, route.contextId).
            then((contextCheck) => {
                if (contextCheck && contextCheck.length > NO_ELEMENT_SIZE) {
                    res.json(route).end();
                } else {
                    res.sendStatus(httpCodes.UNAUTHORIZED).end();
                }
            });
        }

        res.sendStatus(httpCodes.NO_CONTENT).end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;

