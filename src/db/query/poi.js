"use strict";

const db = require('../index');

module.exports.getPOIDetailByID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM pois WHERE id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOITags = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT tags.name, tags.tag_id 
    FROM poi_tags INNER JOIN tags ON poi_tags.tag_id = tags.tag_id 
    WHERE poi_tags.poi_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

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

module.exports.getPOIsWithin = (minLat, maxLat, minLng, maxLng) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * 
    FROM pois 
    WHERE latitude >= :minLat AND latitude <= :maxLat AND longitude >= :minLng AND longitude <= :maxLng`, {
        replacements: {
            maxLat,
            maxLng,
            minLat,
            minLng
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIMedia = (poiID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * 
    FROM poi_contents INNER JOIN content_types ON poi_contents.content_type_id = content_types.content_type_id
    WHERE poi_contents.poi_id = :poiID`, {
        replacements: { poiID },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIRating = (poiID) => {
    // language=POSTGRES-SQL
    return db.query(`WITH current_poi_ratings AS (SELECT MAX(created_at), user_id, rating, poi_id FROM poi_ratings GROUP BY poi_id)
    SELECT AVG(rating) AS rating, COUNT(*) AS ratings 
    FROM current_poi_ratings
    WHERE poi_id = :poiID
    GROUP BY user_id`, {
        replacements: { poiID },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIRatingByUser = (poiID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT rating, MAX("createdAt") FROM poi_ratings WHERE poi_id = :poiID AND user_id = :userID GROUP BY user_id, rating`, {
        replacements: {
            poiID,
            userID
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.addPOIRating = (poiID, userID, rating) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO poi_ratings (poi_id, user_id, rating) VALUES (:poiID, :userID, :rating)`, {
        replacements: {
            poiID,
            rating,
            userID
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.searchPOI = (query) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM pois WHERE text @@ to_tsquery(:query) `, {
        replacements: { query },
        type: db.QueryTypes.SELECT
    });
};

module.exports.searchNearbyPOI = (query, lat, lng) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, get_distance_function(latitude, longitude, :lat, :lng) as distance FROM pois WHERE text @@ to_tsquery(:query) ORDER BY distance DESC`, {
        replacements: {
            lat,
            lng,
            query
        },
        type: db.QueryTypes.SELECT
    });
};
