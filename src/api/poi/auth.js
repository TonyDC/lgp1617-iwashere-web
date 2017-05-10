'use strict';

const express = require('express');
const router = express.Router();

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');
const uploadAux = require('../utils/upload_aux');
const upload = require('../middleware/upload');

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
const TWO_INDEX = 2;
const THREE_INDEX = 3;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;

const bodyTemplate = upload.fields([{ name: 'postFiles' }]);

router.post('/', bodyTemplate, (req, res, next) => {
    const { body, files } = req;
    const { name, description, address, latitude, longitude, poiTypeId, parentId, tags } = body;
    const tagList = utils.convertStringToArray(tags);
    const { postFiles } = files;
    const userID = req.auth.token.uid;

    if (!userID || typeof userID !== 'string' || !name || typeof name !== 'string' || !tagList.length ||
        !description || typeof description !== 'string' || !address || typeof address !== 'string' ||
        !poiTypeId || !latitude || isNaN(parseFloat(latitude)) || !longitude || isNaN(parseFloat(longitude))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userDB, poiDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID), poiDB.getPOITypeByID(poiTypeId)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {
            const createPOI = [poiDB.createPOI(name, description, address, latitude, longitude, poiTypeId, parentId, userID)];
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
                            createAdditionalPoiInfo.push(poiDB.addPostContent(poiId, contentTypeId, urlXs, urlS, urlM, urlL));
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

                res.status(httpCodes.BAD_REQUEST).json({ message: 'error creating poi' }).
                end();

                return null;
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: 'content_editor_id or poi_type_id not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.put('/', bodyTemplate, (req, res, next) => {
    const { body, files } = req;
    const { poiID, name, description, address, latitude, longitude, poiTypeId, parentId, tags, contentsToRemove } = body;
    const tagList = utils.convertStringToArray(tags);
    const poiContentsToRemove = utils.convertStringToArray(contentsToRemove);
    const { postFiles } = files;
    const userID = req.auth.token.uid;

    if (!poiID || !userID || typeof userID !== 'string' || !name || typeof name !== 'string' || !tagList.length ||
        !description || typeof description !== 'string' || !address || typeof address !== 'string' ||
        !poiTypeId || !latitude || isNaN(parseFloat(latitude)) || !longitude || isNaN(parseFloat(longitude))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { userDB, poiDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID),
        poiDB.getPOITypeByID(poiTypeId), poiDB.getPOIDetailByID(poiID)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {
            const createPOI = [poiDB.updatePOI(poiID, name, description, address, latitude, longitude, poiTypeId, parentId)];
            if (postFiles && postFiles.length > NO_ELEMENT_SIZE) {
                createPOI.push(uploadAux.handleFileUpload(postFiles, userID));
            }

            if (poiContentsToRemove && poiContentsToRemove.length > NO_ELEMENT_SIZE) {
                createPOI.push(poiDB.setPOIContentDeleted(poiContentsToRemove));
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
                            createAdditionalPoiInfo.push(poiDB.addPostContent(poiId, contentTypeId, urlXs, urlS, urlM, urlL));
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

router.delete('/:poiID/:deleted', (req, res, next) => {
    const { poiID, deleted } = req.params;
    if (!poiID || typeof deleted === 'undefined') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { poiDB, userDB } = db;
    const primaryChecks = [userDB.getContentEditorByUID(userID),
        poiDB.getPOIDetailByID(poiID)];
    primaryChecks.
    then((results) => {

        if (utils.checkResultList(results, [primaryChecks.length], true)) {

            return poiDB.setPOIDeleted(poiID, deleted).
            then(() => {
                res.end();
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

router.post('/rating', (req, res, next) => {
    const { poiID, rating } = req.body;
    if (!poiID || !rating || RATING_VALUES.indexOf(rating) === VALUE_NOT_FOUND ||
        isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { poiDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)]).
    then((results) => {
        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            return poiDB.addPOIRating(poiID, userID, rating).
            then(() => {
                res.end();
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

module.exports = router;
