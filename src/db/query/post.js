"use strict";

const db = require('../index');

module.exports.getPOIPosts = (poiID, offset, limit) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT *, name AS type, posts.created_at as post_date, posts.post_id
    FROM posts LEFT JOIN post_contents ON post_contents.post_id = posts.post_id LEFT JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
    WHERE poi_id = :poiID AND posts.deleted = FALSE
    ORDER BY posts.created_at DESC LIMIT :limit OFFSET :offset`, {
        replacements: {
            limit,
            offset,
            poiID
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIsPost = (offset, limit) => {
    // language=POSTGRES-PSQL
    return db.query(`WITH poi_ratings AS (SELECT AVG(rating) AS rating, poi_id
                 FROM (SELECT DISTINCT ON (user_id) poi_id, rating FROM poi_ratings
                 ORDER BY user_id, created_at DESC) current_ratings
                 GROUP BY poi_id)
    SELECT DISTINCT ON (single_post_id) *
    FROM (SELECT *, content_types.name AS type, posts.created_at as post_date, posts.poi_id AS single_post_id,
               pois.name AS name, CASE WHEN rating IS NULL THEN 0 ELSE rating END AS rating
          FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
          INNER JOIN posts ON posts.poi_id = pois.poi_id 
          INNER JOIN post_contents ON post_contents.post_id = posts.post_id 
          INNER JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
          WHERE content_types.content_type_id = 1 AND posts.deleted = FALSE AND pois.deleted = FALSE 
          ORDER BY poi_ratings.rating DESC NULLS LAST, post_date DESC) pois_posts
    LIMIT :limit OFFSET :offset;`, {
        replacements: {
            limit,
            offset
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIsPostWithLocation = (lat, lng, offset, limit) => {
    // language=POSTGRES-PSQL
    return db.query(`WITH poi_ratings AS (SELECT AVG(rating) AS rating, poi_id
                 FROM (SELECT DISTINCT ON (user_id) poi_id, rating FROM poi_ratings
                 ORDER BY user_id, created_at DESC) current_ratings
                 GROUP BY poi_id)
    SELECT DISTINCT ON (single_post_id) * 
    FROM (SELECT *, content_types.name AS type, posts.created_at as post_date, posts.poi_id AS single_post_id, 
               get_distance_function(latitude::real, longitude::real, :lat::real, :lng::real) as distance,
               pois.name AS name, CASE WHEN rating IS NULL THEN 0 ELSE rating END AS rating
          FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
          INNER JOIN posts ON posts.poi_id = pois.poi_id 
          INNER JOIN post_contents ON post_contents.post_id = posts.post_id 
          INNER JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
          WHERE content_types.content_type_id = 1 AND posts.deleted = FALSE AND pois.deleted = FALSE  
          ORDER BY distance, poi_ratings.rating DESC NULLS LAST, post_date DESC) pois_posts
    LIMIT :limit OFFSET :offset;`, {
        replacements: {
            lat,
            limit,
            lng,
            offset
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostById = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, name AS type, posts.created_at as post_date, posts.post_id
    FROM posts LEFT JOIN post_contents ON post_contents.post_id = posts.post_id 
    LEFT JOIN content_types ON post_contents.content_type_id = content_types.content_type_id
    WHERE posts.post_id = :id AND posts.deleted = FALSE`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostLikes = (postIdList) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT posts.post_id, SUM(CASE WHEN liked = TRUE THEN 1 ELSE 0 END) AS likes
    FROM posts LEFT JOIN likes ON posts.post_id = likes.post_id
    WHERE posts.deleted = FALSE AND posts.post_id = ANY(:postIdList)
    GROUP BY posts.post_id`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostTags = (postIdList) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * 
    FROM post_tags INNER JOIN tags ON tags.tag_id=post_tags.tag_id 
    WHERE post_tags.post_id = ANY(:postIdList)`, {
        replacements: { postIdList },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPostLikedByUser = (postIdList, userId) => {
    // language=POSTGRES-PSQL
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
    // language=POSTGRES-PSQL
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
    WHERE posts.deleted = FALSE AND post_id = :postID AND user_id = :userID`, {
        replacements: {
            postID,
            userID
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.setPostDeleted = (userID, postID) => {
    // language=POSTGRES-PSQL
    return db.query(`UPDATE posts
    SET deleted = TRUE
    WHERE post_id = :postID AND user_id = :userID`, {
        replacements: {
            postID,
            userID
        },
        type: db.QueryTypes.UPDATE
    });
};

module.exports.addPostContent = (postId, contentTypeId, urlXs, urlS, urlM, urlL) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO post_contents(post_id, content_type_id, url_xs, url_s, url_m, url_l) 
    VALUES(:postId, :contentTypeId, :urlXs, :urlS, :urlM, :urlL) RETURNING content_id`, {
        replacements: {
            contentTypeId,
            postId,
            urlL,
            urlM,
            urlS,
            urlXs
        },
        type: db.QueryTypes.INSERT
    });
};
