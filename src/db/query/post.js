"use strict";

const db = require('../index');

module.exports.getPOIPosts = (id, offset, limit) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, name AS type 
    FROM posts INNER JOIN post_contents ON post_contents.post_id = posts.post_id INNER JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
    WHERE poi_id = :id ORDER BY posts.created_at LIMIT :limit OFFSET :offset`, {
        replacements: {
            id,
            limit,
            offset
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostById = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, name AS type 
    FROM posts INNER JOIN post_contents ON post_contents.post_id = posts.post_id INNER JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
    WHERE posts.post_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostLikes = (postIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT posts.post_id, COUNT(*) as likes 
    FROM posts INNER JOIN likes ON posts.post_id = likes.post_id 
    WHERE posts.post_id = ANY(:postIdList) GROUP BY posts.post_id`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostLikedByUser = (postIdList, userId) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT posts.post_id
    FROM posts INNER JOIN likes ON posts.post_id = likes.post_id 
    WHERE posts.post_id = ANY(:postIdList) AND likes.user_id = :userId`, {
        replacements: {
            postIdList,
            userId
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostTags = (postIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * 
    FROM post_tags INNER JOIN tags ON tags.tag_id=post_tags.tag_id 
    WHERE post_tags.post_id = ANY(:postIdList)`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};

module.exports.addPostLike = (postID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO likes (post_id, user_id) VALUES (:postID, :userID)`, {
        replacements: {
            postID,
            userID
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.removePostLike = (postID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`DELETE FROM likes WHERE post_id = :postID AND user_id = :userID)`, {
        replacements: {
            postID,
            userID
        },
        type: db.QueryTypes.DELETE
    });
};
