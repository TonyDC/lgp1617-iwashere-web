'use strict';

const utils = require('../utils/misc');

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 1;
const NO_ELEMENT_SIZE = 0;
const ONE_SIZE = 2;
const TWO_SIZE = 2;
const THREE_SIZE = 2;

/**
 * Handle GET request for posts.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 *
 * @return {void}
 */
function handlePostRequest(req, res, next) {
    const { poiID, offset, limit, userID } = req.params;

    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE)) || !limit || !offset || isNaN(parseInt(offset, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { postDB } = db;
    postDB.getPOIPosts(poiID, offset, limit).
    then((postsList) => {
        const posts = utils.convertObjectsToCamelCase(postsList);

        if (posts && posts.length > NO_ELEMENT_SIZE) {
            const postsIds = posts.map((post) => {
                return post.postId;
            });

            const additionalPostInfo = [postDB.getPostTags(utils.convertArrayToString(postsIds)),
                postDB.getPostLikes(utils.convertArrayToString(postsIds))];

            if (userID) {
                additionalPostInfo.push(postDB.getPostLikedByUser(postsIds, userID));
            }

            Promise.all(additionalPostInfo).
            then((results) => {
                if (results && (results.length === TWO_SIZE || results.length === THREE_SIZE)) {

                    const postTags = utils.convertObjectsToCamelCase(results[ZERO_INDEX]);
                    const postLikes = utils.convertObjectsToCamelCase(results[ONE_INDEX]);
                    let postsLikedByUser = [];
                    if (userID) {
                        postsLikedByUser = utils.convertObjectsToCamelCase(results[TWO_INDEX]);
                    }

                    posts.forEach((post) => {
                        post.tags = postTags.filter((tag) => {
                            return tag.postId === post.postId;
                        });

                        post.likes = postLikes.filter((like) => {
                            return like.postId === post.postId;
                        });

                        if (post.likes.length > NO_ELEMENT_SIZE) {
                            post.likes = post.likes[ZERO_INDEX].likes;
                        } else {
                            post.likes = NO_ELEMENT_SIZE;
                        }

                        post.likedByUser = postsLikedByUser.filter((like) => {
                            return like.postId === post.postId;
                        }).length > NO_ELEMENT_SIZE;
                    });

                    res.json(posts).end();
                }
            });
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
}

router.get('/poi_posts/:poiID/:offset/:limit', (req, res, next) => {
    handlePostRequest(req, res, next);
});

router.get('/poi_posts/:userID/:poiID/:offset/:limit', (req, res, next) => {
    handlePostRequest(req, res, next);
});

router.post('/post', (req, res, next) => {

})

router.post('/like', (req, res, next) => {
    const { userID, postID, liked } = req.body;

    if (!postID || !userID || typeof userID !== 'string' || typeof liked !== 'boolean') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { postDB, userDB } = db;
    Promise.all([userDB.getUserByUID(userID), postDB.getPostById(postID)]).
    then((results) => {

        if (results && results.length === TWO_SIZE &&
            results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE &&
            results[ONE_INDEX] && results[ONE_INDEX].length > NO_ELEMENT_SIZE) {

            postDB.getPostLike(postID, userID).
            then((result) => {
                if (result && result.length === ONE_SIZE &&
                    results[ZERO_INDEX] && results[ZERO_INDEX].length > NO_ELEMENT_SIZE) {

                    return postDB.updatePostLike(postID, userID, liked).
                    then(() => {
                        res.end();
                    });
                }

                return postDB.addPostLike(postID, userID).
                then(() => {
                    res.end();
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
