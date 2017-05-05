'use strict';

const express = require('express');
const router = express.Router();

const cryptoModule = require('crypto');
const pathModule = require('path');

const httpCodes = require('http-status-codes');
const utils = require('../utils/misc');

const db = root_require('src/db/query');

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

const { sendFileToFirebase, unlink, detectFile } = require('../utils/async_conversions');

router.post('/', (req, res, next) => {
    const { poiID, description, tags, contentUrl, contentHash, contentType } = req.body;
    if (!poiID || typeof description !== 'string' || !tags) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const userID = req.auth.token.uid;

    const { contentDB, postDB, userDB, poiDB } = db;
    const primaryChecks = [userDB.getUserByUID(userID), poiDB.getPOIDetailByID(poiID)];
    if (contentType && typeof contentType === 'string') {
        primaryChecks.push(contentDB.getContentTypeByName(contentType));
    }
    Promise.all(primaryChecks).
    then((results) => {
        if (utils.checkResultList(results, [primaryChecks.length], true)) {

            return postDB.createPost(description, poiID, userID).
            then((postResult) => {
                if (postResult && postResult.length > NO_ELEMENT_SIZE) {
                    const { postId } = utils.convertObjectToCamelCase(postResult[ZERO_INDEX]);
                    const { contentTypeId } = utils.convertObjectToCamelCase(results[TWO_INDEX][ONE_INDEX]);

                    const createAdditionalPostInfo = [postDB.addPostTags(postId, tags)];
                    if (contentUrl && typeof contentUrl === 'string' &&
                        contentHash && typeof contentHash === 'string' &&
                        contentType && typeof contentType === 'string') {
                        createAdditionalPostInfo.push(postDB.addPostContent(postId, contentUrl, contentHash, contentTypeId));
                    }

                    return Promise.all(createAdditionalPostInfo).
                    then((additionalPostInfo) => {
                        if (utils.checkResultList(additionalPostInfo, [createAdditionalPostInfo.length], true)) {

                            return Promise.all([postDB.getPostById(postId),
                                postDB.getPostTags(utils.convertArrayToString([postId]))]).
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

router.post('/upload', (req, res, next) => {
    // req.fields contains non-file fields
    // req.files contains files
    const { uid } = req.auth.token;
    const { fields, files } = req;

    /*
     * size: 261095424,
     * path: '/var/folders/jy/zh7zx0v135lc5722tlt0f2n00000gn/T/upload_ad4f5519b5560a5f99aee575ef591ddf',
     * name: 'debian-mac-8.5.0-amd64-netinst.iso',
     * type: 'application/x-iso9660-image',
     * hash: null,
     * lastModifiedDate: 2017-05-03T18:39:46.983Z,
     */
    const postImage = files.sampleFile;
    if (!postImage) {
        res.status(httpCodes.BAD_REQUEST).send({ message: `'sampleFile' file not found.` }).
        end();

        return;
    }
    const { size, path, name, hash, lastModifiedDate } = postImage;

    detectFile(path).
    then((type) => {
        if (['image/jpeg', 'image/png'].indexOf(type) === ELEMENT_NOT_FOUND) {
            res.status(httpCodes.BAD_REQUEST).send({ message: 'Bad file format. Only JPEG or PNG are accepted' }).
            end();

            return null;
        }

        return sharp(path).metadata().
        then((metadata) => {
            const { width } = metadata;

            const dirname = pathModule.dirname(path);
            const paths = [
                {
                    dir: pathModule.join(dirname, `xsmall_${name}.png`),
                    size: 200
                },
                {
                    dir: pathModule.join(dirname, `small_${name}.png`),
                    size: 400
                },
                {
                    dir: pathModule.join(dirname, `medium_${name}.png`),
                    size: 800
                },
                {
                    dir: pathModule.join(dirname, `large_${name}.png`),
                    size: 1200
                }
            ];
            const promises = paths.map((obj) => {
                return sharp(path).resize(Math.min(width, obj.size)).
                png().
                toFile(obj.dir).
                then(() => {
                    return obj.dir;
                });
            });
            promises.push(Promise.resolve(path));

            return Promise.all(promises);
        }).
        then((arrays) => {
            return Promise.all(arrays.map((imagePath) => {
                return sendFileToFirebase(imagePath, `${uid}/${pathModule.basename(imagePath)} - ${hash} - ${lastModifiedDate} - ${size}`);
            }));
        }).
        then((arrays) => {
            return Promise.all(arrays.map((imagePathObj) => {
                return unlink(imagePathObj.src);
            }));
        }).
        then(() => {
            res.end();
        });
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
