"use strict";

const db = require('../index');

module.exports.getPOIPosts = (id, offset, limit) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * 
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

module.exports.getPostLikes = (postIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT posts.post_id, COUNT(*) as likes 
    FROM posts INNER JOIN likes ON posts.post_id = likes.post_id 
    WHERE posts.post_id = ANY(:postIdList) GROUP BY posts.post_id`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostTags = (postIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT tags.* 
    FROM posts INNER JOIN post_tags ON posts.post_id = post_tags.post_id INNER JOIN tags ON tags.tag_id=post_tags.tag_id 
    WHERE posts.post_id = ANY(:postIdList)`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};
