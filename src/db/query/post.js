"use strict";

const db = require('../index');

module.exports.getPOIPosts = (poiId, offset, limit) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM posts INNER JOIN contents ON posts.content_id = contents.id 
    INNER JOIN content_types ON contents.content_type = content_types.id
    WHERE posts.poi_id = :poiId ORDER BY posts."createdAt" LIMIT :limit OFFSET :offset`, {
        replacements: {
            limit,
            offset,
            poiId
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostLikes = (postIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT posts.id, COUNT(*) as likes 
    FROM posts INNER JOIN post_likes ON posts.id = post_likes.post_id 
    WHERE posts.id = ANY(:postIdList) GROUP BY posts.id`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostTags = (postIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT tags.* FROM posts INNER JOIN post_tags ON posts.id = post_tags.post_id 
    INNER JOIN tags ON tags.id=post_tags.tag WHERE posts.id = ANY(:postIdList)`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};
