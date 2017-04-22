'use strict';

const utils = require('../utils/case-handler');

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const THREE_INDEX = 3;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;

router.get('/poi_posts/:poIID/:offset/:limit', (req, res, next) => {
    const { poiID, offset, limit } = req.params;

    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE)) || !limit || !offset || isNaN(parseInt(offset, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { postDB } = db;
    postDB.getPOIPosts(poiID, offset, limit).
    then((postsList) => {
        console.error(postsList);

        const posts = utils.convertObjectsToCamelCase(postsList);

        console.log(posts);

        if (posts && posts.length > NO_ELEMENT_SIZE) {
            const postsIds = posts.map((post) => {
                return post.id;
            });

            Promise.all([postDB.getPostTags(postsIds), postDB.getPostLikes(postsIds)]).
            then((results) => {
                if (results && results.length === TWO_SIZE) {
                    const postTags = utils.convertObjectsToCamelCase(results[ONE_INDEX]);

                    const postLikes = utils.convertObjectsToCamelCase(results[TWO_INDEX]);

                    posts.forEach((post) => {
                        post.tags = postTags.filter((tag) => {
                            return tag.post_id === post.id;
                        });
                    });

                    // TODO merge with posts
                    console.log(postTags);
                    console.log(postLikes);

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
});
module.exports = router;
