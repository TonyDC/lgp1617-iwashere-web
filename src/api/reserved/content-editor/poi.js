'use strict';

const utils = require('../../utils/misc');
const uploadAux = require('../../utils/upload_aux');
const upload = require('../../middleware/upload');
const httpCodes = require('http-status-codes');
const validator = require('validator');
const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const THREE_INDEX = 3;
const NO_ELEMENT_SIZE = 0;
const ONE_SIZE = 1;
const TWO_SIZE = 2;

const HTTP_ALREADY_REPORTED = 208;

const bodyTemplate = upload.fields([{ name: 'poiFiles' }]);

router.get('/search', (req, res, next) => {
    const { contextID } = req.auth;
    let { query } = utils.trimStringProperties(req.query);
    if (!query || typeof query !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    query = query.split(/\s+/).
    join(' & ');

    db.poiDB.searchPOIsUnderContexts(query, contextID).
    then((results) => {
        if (results) {
            res.json(utils.convertObjectsToCamelCase(results)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

// Create new POI
router.post('/', bodyTemplate, (req, res, next) => {
    const { body, files } = req;
    const { name, description, address, latitude, longitude, poiTypeId, parentId, tags, context, metaInfo } = utils.trimStringProperties(body);
    const { poiFiles } = files;
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;
    const tagList = utils.parseJSON(tags);

    if (typeof userID !== 'string' || typeof name !== 'string' || validator.isEmpty(name) || !Array.isArray(tagList) ||
        typeof description !== 'string' || validator.isEmpty(description) || typeof address !== 'string' ||
        validator.isEmpty(address) || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude)) ||
        typeof poiTypeId !== 'string' || typeof context !== 'string' || validator.isEmpty(context)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB } = db;
    Promise.all([userContextDB.verifyContextUnderUserJurisdiction(userContext, context), poiDB.getPOITypeByID(poiTypeId)]).
    then((results) => {
        if (utils.checkResultList(results, [TWO_SIZE], true)) {
            const createPOI = [poiDB.createPOI(name, description, address, latitude, longitude, poiTypeId, userID, context, metaInfo, parentId)];
            if (poiFiles && poiFiles.length > NO_ELEMENT_SIZE) {
                createPOI.push(uploadAux.handleFileUpload(poiFiles, userID));
            }

            return Promise.all(createPOI).
            then((poiCreationResults) => {
                if (utils.checkResultList(poiCreationResults, [createPOI.length], true)) {
                    const { poiId } = utils.convertObjectToCamelCase(poiCreationResults[ZERO_INDEX][ZERO_INDEX]);
                    const createAdditionalPoiInfo = [];
                    if (typeof tagList === 'object' && Array.isArray(tagList) && tagList.length > NO_ELEMENT_SIZE) {
                        createAdditionalPoiInfo.push(poiDB.setPOITags(poiId, tagList));
                    }

                    if (poiFiles && poiFiles.length > NO_ELEMENT_SIZE) {
                        poiCreationResults[ONE_INDEX].forEach((fileCreated) => {
                            const { contentUrls, contentTypeId } = fileCreated.fileInfo;
                            const urlXs = contentUrls[ZERO_INDEX];
                            const urlS = contentUrls[ONE_INDEX];
                            const urlM = contentUrls[TWO_INDEX];
                            const urlL = contentUrls[THREE_INDEX];
                            createAdditionalPoiInfo.push(poiDB.addPOIContent(poiId, contentTypeId, urlXs, urlS, urlM, urlL));
                        });
                    }

                    return Promise.all(createAdditionalPoiInfo).
                    then((additionalPoiInfo) => {
                        if (utils.checkResultList(additionalPoiInfo, [createAdditionalPoiInfo.length], true)) {

                            return res.json({ poiId }).end();
                        }

                        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'error adding tags or content to poi' }).
                        end();

                        return null;
                    });
                }

                res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'error creating poi' }).
                end();

                return null;
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: 'content_editor_id with invalid context jurisdiction / poi_type_id not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

// Update POI
router.put('/:poiID', bodyTemplate, (req, res, next) => {
    const { body, files } = req;
    const { poiID } = req.params;
    const { name, description, address, latitude, longitude, poiTypeId, parentId, tags, filesDeleted, context, metaInfo } = utils.trimStringProperties(body);
    const { poiFiles } = files;
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;
    const tagList = utils.parseJSON(tags);
    const poiContentsToRemove = utils.parseJSON(filesDeleted);

    if (!poiID || typeof poiID !== 'string' || !validator.isNumeric(poiID) || !Array.isArray(tagList) || !Array.isArray(poiContentsToRemove) ||
        typeof userID !== 'string' || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || typeof address !== 'string' ||
        validator.isEmpty(address) || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude)) ||
        typeof poiTypeId !== 'string' || typeof context !== 'string' || validator.isEmpty(context)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, context), poiDB.getPOITypeByID(poiTypeId), poiDB.getPOIByID(poiID)];
    Promise.all(primaryChecks).
    then((results) => {
        if (!utils.checkResultList(results, [primaryChecks.length], true)) {
            res.status(httpCodes.BAD_REQUEST).json({ message: 'Bad parameters' }).
            end();

            return;
        }

        // check if current context is under user jurisdiction
        const { contextId } = utils.convertObjectToCamelCase(results[TWO_INDEX][ZERO_INDEX]);
        userContextDB.verifyContextUnderUserJurisdiction(userContext, contextId).
        then((result) => {
            if (!result || result.length < ONE_SIZE) {
                res.status(httpCodes.BAD_REQUEST).json({ message: 'User cannot modify POI information due to context constraints' }).
                end();

                return null;
            }

            const POIUpdatePromises = [poiDB.updatePOI(poiID, userID, name, description, address, latitude, longitude, poiTypeId, context, metaInfo, parentId)];
            const filesToUpload = poiFiles && poiFiles.length > NO_ELEMENT_SIZE;
            if (filesToUpload) {
                POIUpdatePromises.push(uploadAux.handleFileUpload(poiFiles, userID));
            }

            if (typeof tagList === 'object' && Array.isArray(tagList) && tagList.length > NO_ELEMENT_SIZE) {
                POIUpdatePromises.push(poiDB.setPOITags(poiID, tagList));
            }

            if (typeof poiContentsToRemove === 'object' && Array.isArray(poiContentsToRemove) && poiContentsToRemove.length > NO_ELEMENT_SIZE) {
                POIUpdatePromises.push(poiDB.setPOIContentDeleted(poiContentsToRemove));
            }

            return Promise.all(POIUpdatePromises).
            then((poiUpdateResults) => {
                const newPOIFiles = [];
                if (filesToUpload) {
                    poiUpdateResults[ONE_INDEX].forEach((fileCreated) => {
                        const { contentUrls, contentTypeId } = fileCreated.fileInfo;
                        const urlXs = contentUrls[ZERO_INDEX];
                        const urlS = contentUrls[ONE_INDEX];
                        const urlM = contentUrls[TWO_INDEX];
                        const urlL = contentUrls[THREE_INDEX];
                        newPOIFiles.push(poiDB.addPOIContent(poiID, contentTypeId, urlXs, urlS, urlM, urlL));
                    });
                }

                return Promise.all(newPOIFiles).
                then((filesResults) => {
                    if (utils.checkResultList(filesResults, [newPOIFiles.length], true)) {
                        res.json({ message: 'OK' }).end();
                    } else {
                        res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error while submitting the files' }).
                        end();
                    }
                });
            });
        });
    }).
    catch((err) => {
        next(err);
    });
});

// To separate POI information update from POI deletion
router.post('/:poiID', (req, res, next) => {
    const { poiID } = utils.trimStringProperties(req.params);
    const { deleted } = req.body;
    const { uid: userID } = req.auth.token;
    const { contextID: userContextID } = req.auth;
    if (!poiID || typeof poiID !== 'string' || !validator.isNumeric(poiID) || typeof deleted !== 'boolean') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB, userContextDB } = db;
    poiDB.getPOIByID(poiID).
    then((result) => {
        if (!result || result.length === NO_ELEMENT_SIZE) {
            return res.status(httpCodes.BAD_REQUEST).json({ message: 'Invalid POI' }).
            end();
        }

        const [{ context_id: contextID, deleted: poiDeletedStatus }] = result;

        return userContextDB.verifyContextUnderUserJurisdiction(userContextID, contextID).
        then((contextResult) => {
            if (!contextResult || contextResult.length === NO_ELEMENT_SIZE) {
                return res.status(httpCodes.UNAUTHORIZED).json({ message: 'User does not belong to the POI context' }).
                end();
            } else if (poiDeletedStatus === deleted) {
                return res.status(HTTP_ALREADY_REPORTED).json({ message: 'Same POI delete status. No information has been modified' }).
                end();
            }

            return poiDB.setPOIDeleted(poiID, userID, deleted).
            then(() => {
                res.json({ message: 'OK' }).end();
            });
        });
    }).
    catch((err) => {
        next(err);
    });
});

router.get('/:poiID', (req, res, next) => {
    const { poiID } = utils.trimStringProperties(req.params);
    const { contextID: userContext } = req.auth;
    if (!poiID || typeof poiID !== 'string' || !validator.isNumeric(poiID)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB } = db;
    Promise.all([poiDB.getPOIDetailByID(poiID, true), poiDB.getPOITags(poiID), poiDB.getPOIAllMedia(poiID)]).
    then((results) => {
        const poi = utils.convertObjectToCamelCase(results[ZERO_INDEX][ZERO_INDEX]);
        poi.tags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);
        poi.contents = utils.convertObjectsToCamelCase(results[TWO_INDEX]);

        return userContextDB.verifyContextUnderUserJurisdiction(userContext, poi.contextId).
        then((contextCheck) => {
            if (contextCheck && contextCheck.length > NO_ELEMENT_SIZE) {
                res.json(poi).end();
            } else {
                res.sendStatus(httpCodes.UNAUTHORIZED).end();
            }
        });
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
