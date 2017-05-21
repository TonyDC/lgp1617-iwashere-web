'use strict';

const utils = require('../../utils/misc');
const uploadAux = require('../../utils/upload_aux');
const upload = require('../../middleware/upload');

const httpCodes = require('http-status-codes');
const validator = require('validator');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const VALUE_NOT_FOUND = -1;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const THREE_INDEX = 3;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;

const HTTP_ALREADY_REPORTED = 208;

const bodyTemplate = upload.fields([{ name: 'postFiles' }]);

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { poiDB } = db;
    const promisesToFulfill = [poiDB.getPOIDetailByID(id, true), poiDB.getPOITags(id), poiDB.getPOIAllMedia(id)];
    Promise.all(promisesToFulfill).
    then((results) => {
        if (utils.checkResultList(results, [promisesToFulfill.length], true)) {
            const poi = utils.convertObjectToCamelCase(results[ZERO_INDEX][ZERO_INDEX]);
            poi.tags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);
            poi.contents = utils.convertObjectsToCamelCase(results[TWO_INDEX]);

            res.json(poi).end();
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
    const { name, description, address, latitude, longitude, poiTypeId, parentId, tags, context } = utils.trimStringProperties(body);
    const tagList = JSON.parse(tags);
    const { postFiles } = files;
    const { uid: userID } = req.auth.token;
    const { contextID: userContext } = req.auth;

    if (typeof userID !== 'string' || typeof name !== 'string' || validator.isEmpty(name) ||
        typeof description !== 'string' || validator.isEmpty(description) || typeof address !== 'string' ||
        validator.isEmpty(address) || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude)) ||
        typeof context !== 'string' || validator.isEmpty(context)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userContextDB, poiDB } = db;
    const primaryChecks = [userContextDB.verifyContextUnderUserJurisdiction(userContext, context),
        poiDB.getPOITypeByID(poiTypeId)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {
            const createPOI = [poiDB.createPOI(name, description, address, latitude, longitude, poiTypeId, userID, context, parentId)];
            if (postFiles && postFiles.length > NO_ELEMENT_SIZE) {
                createPOI.push(uploadAux.handleFileUpload(postFiles, userID));
            }

            return Promise.all(createPOI).
            then((poiCreationResults) => {
                if (utils.checkResultList(poiCreationResults, [createPOI.length], true)) {
                    const { poiId } = utils.convertObjectToCamelCase(poiCreationResults[ZERO_INDEX][ZERO_INDEX]);
                    const createAdditionalPoiInfo = [];
                    if (tagList.length > NO_ELEMENT_SIZE) {
                        createAdditionalPoiInfo.push(poiDB.setPOITags(poiId, tagList));
                    }

                    if (postFiles && postFiles.length > NO_ELEMENT_SIZE) {
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
    const { name, description, address, latitude, longitude, poiTypeId, parentId, tags, contentsToRemove } = body;
    const tagList = utils.convertStringToArray(tags);
    const poiContentsToRemove = utils.convertStringToArray(contentsToRemove);
    const { postFiles } = files;
    const { uid: userID } = req.auth.token;

    if (!poiID || !userID || typeof userID !== 'string' || !name || typeof name !== 'string' || !tagList.length ||
        !description || typeof description !== 'string' || !address || typeof address !== 'string' ||
        !poiTypeId || !latitude || isNaN(parseFloat(latitude)) || !longitude || isNaN(parseFloat(longitude))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userDB, poiDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID),
        poiDB.getPOITypeByID(poiTypeId), poiDB.getPOIDetailByID(poiID, true)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {
            const updatePOI = [poiDB.updatePOI(poiID, name, description, address, latitude, longitude, poiTypeId, parentId)];
            if (postFiles && postFiles.length > NO_ELEMENT_SIZE) {
                updatePOI.push(uploadAux.handleFileUpload(postFiles, userID));
            }

            if (poiContentsToRemove && poiContentsToRemove.length > NO_ELEMENT_SIZE) {
                updatePOI.push(poiDB.setPOIContentDeleted(poiContentsToRemove));
            }

            return Promise.all(updatePOI).
            then((poiUpdateResults) => {
                if (utils.checkResultList(poiUpdateResults, [updatePOI.length], true)) {
                    const { poiId } = utils.convertObjectToCamelCase(poiUpdateResults[ZERO_INDEX][ZERO_INDEX]);
                    const createAdditionalPoiInfo = [];
                    if (tagList.length > NO_ELEMENT_SIZE) {
                        createAdditionalPoiInfo.push(poiDB.setPOITags(poiId, tagList));
                    }

                    if (postFiles && postFiles.length > NO_ELEMENT_SIZE) {
                        poiUpdateResults[ONE_INDEX].forEach((fileCreated) => {
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

                        res.status(httpCodes.BAD_REQUEST).json({ message: 'error adding tags or content to poi' }).
                        end();

                        return null;
                    });
                }

                res.status(httpCodes.BAD_REQUEST).json({ message: 'error updating poi' }).
                end();

                return null;
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: 'content_editor_id, poi_id or poi_type_id not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

// To separate POI information update from POI deletion
router.post('/:poiID', (req, res, next) => {
    const { poiID } = req.params;
    const { deleted } = req.body;

    if (!poiID || typeof deleted !== 'boolean') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { uid: userID } = req.auth.token;
    const { contextID: userContextID } = req.auth;

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
                return res.status(httpCodes.BAD_REQUEST).json({ message: 'User does not belong to the POI context' }).
                end();
            } else if (poiDeletedStatus === deleted) {
                return res.sendStatus(HTTP_ALREADY_REPORTED).
                end();
            }

            return poiDB.setPOIDeleted(poiID, userID, deleted).
            then(() => {
                res.end();
            });
        });
    }).
    catch((err) => {
        next(err);
    });
});

module.exports = router;
