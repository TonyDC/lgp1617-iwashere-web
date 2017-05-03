"use strict";

const db = require('../index');

module.exports.getPOIPosts = (id, offset, limit) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, name AS type, posts.created_at as post_date, posts.post_id
    FROM posts LEFT JOIN post_contents ON post_contents.post_id = posts.post_id LEFT JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
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
    return db.query(`SELECT *, name AS type, posts.created_at as post_date, posts.post_id
    FROM posts LEFT JOIN post_contents ON post_contents.post_id = posts.post_id LEFT JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
    WHERE posts.post_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostLikes = (postIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT posts.post_id, SUM(CASE WHEN liked = TRUE THEN 1 ELSE 0 END) AS likes
    FROM posts LEFT JOIN likes ON posts.post_id = likes.post_id
    WHERE posts.post_id = ANY(:postIdList)
    GROUP BY posts.post_id`, {
        replacements: { postIdList },
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

module.exports.getPostLikedByUser = (postIdList, userId) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT post_id
    FROM likes 
    WHERE post_id = ANY(:postIdList) AND user_id = :userId AND liked = TRUE`, {
        replacements: {
            postIdList,
            userId
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostLike = (postId, userId) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT post_id
    FROM likes 
    WHERE post_id = :postId AND user_id = :userId`, {
        replacements: {
            postId,
            userId
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.addPostLike = (postID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO likes (post_id, user_id, liked) VALUES (:postID, :userID, TRUE)`, {
        replacements: {
            postID,
            userID
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.updatePostLike = (postID, userID, liked) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE likes SET liked = :liked WHERE post_id = :postID AND user_id = :userID`, {
        replacements: {
            liked,
            postID,
            userID
        },
        type: db.QueryTypes.DELETE
    });
};

module.exports.createPost = (description, poiID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO posts(description, poi_id, user_id) 
    VALUES(:description, :poiID, :userID) RETURNING post_id`, {
        replacements: {
            description,
            poiID,
            userID
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.addPostTags = (postID, tagIdList) => {
    // language=POSTGRES-SQL
    return db.query(` 
    INSERT INTO post_tags(post_id, tag_id)
    VALUES (:postID, unnest(array[:tagIdList])) ON CONFLICT DO NOTHING RETURNING tag_id`, {
        replacements: {
            postID,
            tagIdList
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.getUserPost = (userID, postID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *
    FROM posts
    WHERE post_id = :postID AND user_id = :userID`, {
        replacements: {
            postID,
            userID
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.setPostDeleted = (userID, postID) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE ON posts
    SET deleted = TRUE
    WHERE post_id = :postID AND user_id = :userID`, {
        replacements: {
            postID,
            userID
        },
        type: db.QueryTypes.UPDATE
    });
};
