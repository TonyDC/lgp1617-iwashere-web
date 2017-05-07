const utils = require('./misc');
const db = root_require('src/db/query');

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;
const NO_ELEMENT_SIZE = 0;
const TWO_SIZE = 2;
const THREE_SIZE = 3;

/**
 * Handle request for Posts associated to a POI.
 * Returns a list of Posts and respective Contents, Tags and Likes.
 * If userID is set, the user's likes are returned as well.
 * @param {Object} params object with the original request's parameters
 *
 * @return {Object} promise of results
 */
module.exports.handleGetPOIPostsRequest = (params) => {
    return new Promise((fulfill, reject) => {
        const { poiID, offset, limit, userID } = params;

        const { postDB } = db;
        postDB.getPOIPosts(poiID, offset, limit).
        then((postsList) => {
            const posts = utils.convertObjectsToCamelCase(postsList);

            if (posts && posts.length > NO_ELEMENT_SIZE) {
                const postIds = posts.map((post) => {
                    return post.postId;
                });

                const additionalPostInfo = [postDB.getPostTags(utils.convertArrayToString(postIds)),
                    postDB.getPostLikes(utils.convertArrayToString(postIds))];

                if (userID) {
                    additionalPostInfo.push(postDB.getPostLikedByUser(utils.convertArrayToString(postIds), userID));
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

                            post.likedByUser = (postsLikedByUser.filter((like) => {
                                return like.postId === post.postId;
                            })).length > NO_ELEMENT_SIZE;
                        });

                        fulfill(posts);
                    }

                    fulfill([]);
                });
            } else {
                fulfill([]);
            }
        }).
        catch((error) => {
            reject(error);
        });
    });
};

module.exports.handleGetPOIsPostRequest = (params) => {
    return new Promise((fulfill, reject) => {
        const { offset, limit, userID, lat, lng } = params;

        const { postDB } = db;
        let postRequest = null;
        if (lat && lng) {
            postRequest = postDB.getPOIsPostWithLocation(lat, lng, offset, limit);
        } else {
            postRequest = postDB.getPOIsPost(offset, limit);
        }

        postRequest.
        then((postsList) => {
            const posts = utils.convertObjectsToCamelCase(postsList);

            if (posts && posts.length > NO_ELEMENT_SIZE) {
                const postIds = posts.map((post) => {
                    return post.postId;
                });

                const additionalPostInfo = [postDB.getPostTags(utils.convertArrayToString(postIds)),
                    postDB.getPostLikes(utils.convertArrayToString(postIds))];

                if (userID) {
                    additionalPostInfo.push(postDB.getPostLikedByUser(utils.convertArrayToString(postIds), userID));
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
                            post.rating = parseFloat(post.rating);

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

                            post.likedByUser = (postsLikedByUser.filter((like) => {
                                return like.postId === post.postId;
                            })).length > NO_ELEMENT_SIZE;
                        });

                        fulfill(posts);
                    }

                    fulfill([]);
                });
            } else {
                fulfill([]);
            }
        }).
        catch((error) => {
            reject(error);
        });
    });
};
