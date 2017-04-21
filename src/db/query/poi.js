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
    return db.query(`SELECT tags.name AS name, tags.id AS id FROM poi_tags INNER JOIN tags ON poi_tags.tag_id=tags.id WHERE poi_tags.poi_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIPosts = (id, offset, limit) => {
    // language=POSTGRES-SQL
    return db.query(`WITH all_media AS (SELECT * FROM images UNION SELECT * FROM videos UNION SELECT * FROM audio)
    SELECT * FROM posts INNER JOIN contents ON posts.content_id = contents.id INNER JOIN all_media ON contents.id = all_media.content_id
    WHERE poi_id = :id ORDER BY posts."createdAt" LIMIT :limit OFFSET :offset`, {
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
    return db.query(`SELECT * FROM pois WHERE latitude >= :minLat AND latitude <= :maxLat AND longitude >= :minLng AND longitude <= :maxLng`, {
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
    return db.query(`WITH poi_media AS (SELECT contents.id FROM contents INNER JOIN poi_content ON (contents.id = poi_content.content_id) WHERE poi_content.poi_id = :poiID)
    (SELECT * FROM images INNER JOIN contents ON images.content_id=contents.id WHERE content_id IN (SELECT * FROM poi_media))
    UNION 
    (SELECT * FROM videos INNER JOIN contents ON videos.content_id=contents.id WHERE content_id IN (SELECT * FROM poi_media))`, {
        replacements: { poiID },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIRating = (poiID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT AVG(rating) AS rating, COUNT(*) AS ratings FROM poi_ratings WHERE poi_id = :poiID`, {
        replacements: { poiID },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIRatingByUser = (poiID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT rating FROM poi_ratings WHERE poi_id = :poiID AND user_id = :userID`, {
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

module.exports.updatePOIRating = (poiID, userID, rating) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE poi_ratings SET rating = :rating WHERE poi_id = :poiID AND user_id = :userID`, {
        replacements: {
            poiID,
            rating,
            userID
        },
        type: db.QueryTypes.UPDATE
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
