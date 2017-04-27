"use strict";

const db = require('../index');

module.exports.getPOIDetailByID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT pois.*, poi_types.name AS type 
    FROM pois INNER JOIN poi_types ON pois.poi_type_id = poi_types.poi_type_id 
    WHERE pois.poi_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOITags = (poiID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT tags.name, tags.tag_id 
    FROM poi_tags INNER JOIN tags ON poi_tags.tag_id = tags.tag_id 
    WHERE poi_tags.poi_id = :poiID`, {
        replacements: { poiID },
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

module.exports.getPOIAllMedia = (poiId) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, name AS type 
    FROM poi_contents INNER JOIN content_types ON poi_contents.content_type_id = content_types.content_type_id
    WHERE poi_contents.poi_id = :poiId`, {
        replacements: { poiId },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIMedia = (poiIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, name AS type 
    FROM poi_contents INNER JOIN content_types ON poi_contents.content_type_id = content_types.content_type_id
    WHERE content_types.content_type_id = '1' AND poi_contents.poi_id = ANY(:poiIdList) 
    ORDER BY poi_contents.created_at DESC LIMIT 1`, {
        replacements: { poiIdList },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIRating = (poiID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT AVG(rating) AS rating, COUNT(*) AS ratings 
    FROM (SELECT DISTINCT ON (user_id) * FROM poi_ratings WHERE poi_id = :poiID
    ORDER BY user_id, created_at DESC) current_ratings`, {
        replacements: { poiID },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIRatingByUser = (poiID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT rating FROM poi_ratings 
    WHERE poi_id = :poiID AND user_id = :userID 
    ORDER BY created_at DESC LIMIT 1`, {
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
    return db.query(`SELECT *, get_distance_function(latitude::real, longitude::real, :lat::real, :lng::real) as distance FROM pois WHERE text @@ to_tsquery(:query) ORDER BY distance DESC`, {
        replacements: {
            lat,
            lng,
            query
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getNearbyPOIs = (lat, lng, limit) => {
    // language=POSTGRES-SQL
    return db.query(`WITH poi_ratings AS 
    (SELECT AVG(rating) AS rating, poi_id
    FROM (SELECT DISTINCT ON (user_id) poi_id, rating FROM poi_ratings
    ORDER BY user_id, created_at DESC) current_ratings
    GROUP BY poi_id)
    SELECT *, get_distance_function(latitude::real, longitude::real, :lat::real, :lng::real) as distance 
    FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
    ORDER BY rating NULLS LAST, distance DESC LIMIT :limit`, {
        replacements: {
            lat,
            limit,
            lng
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getTopRatedPOIs = (limit) => {
    // language=POSTGRES-SQL
    return db.query(`WITH poi_ratings AS 
    (SELECT AVG(rating) AS rating, poi_id
    FROM (SELECT DISTINCT ON (user_id) poi_id, rating FROM poi_ratings
    ORDER BY user_id, created_at DESC) current_ratings
    GROUP BY poi_id)
    SELECT *
    FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
    ORDER BY rating NULLS LAST LIMIT :limit`, {
        replacements: { limit },
        type: db.QueryTypes.SELECT
    });
};
