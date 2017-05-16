'use strict';

const express = require('express');
const router = express.Router();

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');
const uploadAux = require('../utils/upload_aux');
const upload = require('../middleware/upload');

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;
const NO_ELEMENT_SIZE = 0;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const THREE_INDEX = 3;
const ONE_SIZE = 1;
const TWO_SIZE = 2;
const THREE_SIZE = 3;

const bodyTemplate = upload.fields([{ name: 'postFiles' }]);

router.post('/', bodyTemplate, (req, res, next) => {
    const { body, files } = req;
    const { poiID, description, tags } = body;
    const { postFiles } = files;
    const userID = req.auth.token.uid;

    if (!poiID || typeof description !== 'string' || !userID || typeof userID !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { postDB, userDB, poiDB } = db;
    const primaryChecks = [userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {
            const createPost = [postDB.createPost(description, poiID, userID)];
            if (postFiles && postFiles.length > NO_ELEMENT_SIZE) {
                createPost.push(uploadAux.handleFileUpload(postFiles, userID));
            }

            return Promise.all(createPost).
            then((postResults) => {
                if (utils.checkResultList(postResults, [createPost.length], true)) {
                    const { postId } = utils.convertObjectToCamelCase(postResults[ZERO_INDEX][ZERO_INDEX]);
                    const createAdditionalPostInfo = [];
                    if (utils.convertStringToArray(tags).length > NO_ELEMENT_SIZE) {
                        createAdditionalPostInfo.push(postDB.addPostTags(postId, utils.convertStringToArray(tags)));
                    }

                    if (postFiles && postFiles.length > NO_ELEMENT_SIZE) {
                        const { contentUrls, contentTypeId } = postResults[ONE_INDEX][ZERO_INDEX].fileInfo;
                        const urlXs = contentUrls[ZERO_INDEX];
                        const urlS = contentUrls[ONE_INDEX];
                        const urlM = contentUrls[TWO_INDEX];
                        const urlL = contentUrls[THREE_INDEX];
                        createAdditionalPostInfo.push(postDB.addPostContent(postId, contentTypeId, urlXs, urlS, urlM, urlL));
                    }

                    return Promise.all(createAdditionalPostInfo).
                    then((additionalPostInfo) => {
                        if (utils.checkResultList(additionalPostInfo, [createAdditionalPostInfo.length], true)) {

                            return Promise.all([postDB.getPostById(postId), postDB.getPostTags(utils.convertArrayToString([postId]))]).
                            then((getPostResult) => {
                                if (utils.checkResultList(getPostResult, [TWO_SIZE]) &&
                                    getPostResult[ZERO_INDEX].length > NO_ELEMENT_SIZE) {

                                    const newPost = utils.convertObjectToCamelCase(getPostResult[ZERO_INDEX][ZERO_INDEX]);
                                    newPost.tags = utils.convertObjectsToCamelCase(getPostResult[ONE_INDEX]);
                                    newPost.likes = NO_ELEMENT_SIZE;
                                    newPost.likedByUser = false;

                                    res.json(newPost).end();
                                } else {
                                    res.status(httpCodes.BAD_REQUEST).json({ message: 'unknown error' }).
                                    end();
                                }
                            });
                        }

                        res.status(httpCodes.BAD_REQUEST).json({ message: 'error adding tags or content to post' }).
                        end();

                        return null;
                    });
                }

                res.status(httpCodes.BAD_REQUEST).json({ message: 'error creating post' }).
                end();

                return null;
            });
        }

        res.status(httpCodes.BAD_REQUEST).json({ message: 'userID, poiID or contentType not found' }).
        end();

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

router.delete('/:postID', (req, res, next) => {
    const { postID } = req.params;

    if (!postID) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { postDB } = db;
    postDB.getUserPost(userID, postID).
    then((results) => {

        if (results && results.length === ONE_SIZE) {

            return postDB.setPostDeleted(userID, postID).
            then(() => {
                res.end();
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

router.post('/like', (req, res, next) => {
    const { postID, liked } = req.body;
    if (!postID || isNaN(parseInt(postID, DECIMAL_BASE)) || typeof liked !== 'boolean') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

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
