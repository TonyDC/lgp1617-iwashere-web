'use strict';

const express = require('express');
const router = express.Router();

const pathModule = require('path');

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');
const upload_aux = require('../utils/upload_aux');

const db = root_require('src/db/query');

const async = require('async');

const DECIMAL_BASE = 10;

const NO_ELEMENT_SIZE = 0;
const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const ONE_SIZE = 1;
const TWO_SIZE = 2;
const THREE_SIZE = 3;

const ELEMENT_NOT_FOUND = -1;

const sharp = require('sharp');
const { sendFileToFirebase, unlink, detectFile, getHashOfFile } = require('../utils/async_conversions');
const upload = require('../middleware/upload');

const bodyTemplate = upload.fields([{ name: 'postFiles' }]);
router.post('/', bodyTemplate, (req, res, next) => {
    const { body, files } = req;
    const { poiID, description, tags } = body;
    if (!poiID || typeof description !== 'string' || !tags) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    console.log(body);
    console.log(files);

    const userID = req.auth.token.uid;

    const { postDB, userDB, poiDB } = db;
    const primaryChecks = [userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)];
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {

            return Promise.all([postDB.createPost(description, poiID, userID),
                upload_aux.handleFileUpload(files, userID)]).
            then((postResults) => {
                if (utils.checkResultList(postResults, [TWO_SIZE], true)) {
                    const { postId } = utils.convertObjectToCamelCase(postResults[ZERO_INDEX][ZERO_INDEX]);
                    const { contentUrl, contentHash, contentTypeId } = postResults[ONE_INDEX][ZERO_INDEX];

                    const createAdditionalPostInfo = [postDB.addPostTags(postId, tags)];
                    if (contentUrl && typeof contentUrl === 'string' &&
                        contentHash && typeof contentHash === 'string' &&
                        contentTypeId) {
                        createAdditionalPostInfo.push(postDB.addPostContent(postId, contentUrl, contentHash, contentTypeId));
                    }

                    return Promise.all(createAdditionalPostInfo).
                    then((additionalPostInfo) => {
                        if (utils.checkResultList(additionalPostInfo, [createAdditionalPostInfo.length], true)) {

                            return Promise.all([postDB.getPostById(postId), postDB.getPostTags(utils.convertArrayToString([postId]))]).
                            then((getPostResult) => {
                                if (utils.checkResultList(getPostResult, [TWO_SIZE], true)) {

                                    const newPost = utils.convertObjectToCamelCase(getPostResult[ZERO_INDEX]);
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

router.put('/', (req, res, next) => {
    const { postID } = req.body;

    if (!postID) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { postDB } = db;
    postDB.getUserPost(userID, postID).
    then((results) => {

        if (results && results.length === ONE_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {

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


function processFiles (uid) {
    return (fileItem, callback) => {
        console.log(fileItem);
        const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = fileItem;

        detectFile(path).then((type) => {
            const typeIndex = ['image/jpeg', 'image/png'].indexOf(type);
            if (typeIndex === ELEMENT_NOT_FOUND) {
                return callback({
                    code: 1,
                    message: 'Bad file format. Only JPEG or PNG are accepted'
                });
            }

            const extension = typeIndex === 0
                ? 'jpeg'
                : 'png';

            return sharp(path).metadata().
            then((metadata) => {
                const { width } = metadata;

                const dirname = pathModule.dirname(path);
                const paths = [
                    {
                        basename: `xsmall_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `xsmall_${filename}.${extension}`),
                        size: 200
                    },
                    {
                        basename: `small_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `small_${filename}.${extension}`),
                        size: 400
                    },
                    {
                        basename: `medium_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `medium_${filename}.${extension}`),
                        size: 800
                    },
                    {
                        basename: `large_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `large_${filename}.${extension}`),
                        size: 1200
                    }
                ];
                const promises = paths.map((obj) => {
                    let sharpObject = sharp(path).resize(Math.min(width, obj.size));
                    if (typeIndex === 0) {
                        sharpObject = sharpObject.png();
                    } else {
                        sharpObject = sharpObject.png();
                    }

                    return sharpObject.
                    toFile(obj.dir).
                    then(() => {
                        return obj;
                    }).
                    catch((error) => {
                        return Object.assign({}, obj, { error });
                    });
                });
                promises.push(Promise.resolve({
                    basename: `original_${filename}.${extension}`,
                    dir: path,
                    size: width
                }));

                return Promise.all(promises);
            }).
            then((arrays) => {
                return Promise.all(arrays.map((imageInfo) => {
                    const { basename, dir } = imageInfo;

                    return getHashOfFile(dir).
                    then((hash) => {
                        return sendFileToFirebase(dir, `${uid}/${hash} - ${size} - ${basename}`);
                    });
                }));
            }).
            then((arrays) => {
                return Promise.all(arrays.map((imagePathObj) => {
                    return unlink(imagePathObj.src);
                }));
            }).
            then(() => {
                return callback();
            });
        }).
        catch((error) => {
            // TODO unlink files
            callback({
                code: 2,
                message: error
            });
        });
    };
}

/*
 * WARNING: Make sure that you always handle the files that a user uploads.
 * Never add multer as a global middleware since a malicious user could upload files to a route that you didn’t anticipate.
 * Only use this function on routes where you are handling the uploaded files.
 */
//const bodyTemplate = upload.fields([{ name: 'postFiles' }]);
router.post('/upload', bodyTemplate, (req, res, next) => {
    // req.body contains non-file fields
    // req.files contains files

    const { uid } = req.auth.token;
    const { body, files } = req;

    const { description , tags, poiId } = body;
    const { postFiles } = files;

    // TODO check fields
    console.log(body);
    console.log(files);

    async.each(postFiles, processFiles(uid), (err) => {
        if (err) {
            const { code, message } = err;
            if (code === 1) {
                res.status(httpCodes.BAD_REQUEST).json({ message }).
                end();

                return null;
            }

            return next(message);
        }

        res.end();

        return null;
    });
});

module.exports = router;
