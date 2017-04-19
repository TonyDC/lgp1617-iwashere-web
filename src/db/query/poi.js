"use strict";

const moment = require('moment');
const TODAY = moment().format();

const db = require('../index');

module.exports.getPOIDetailByID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM pois WHERE id = :id`, {
        replacements: { id },
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
    return db.query(`SELECT * FROM content INNER JOIN poi_content ON (content.id = poi_content.content_id) WHERE poi_content.poi_id = :poiID`, {
        replacements: { poiID },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIRating = (poiID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT AVG(rating) AS rating FROM poi_ratings WHERE poi_id = :poiID`, {
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
    return db.query(`INSERT INTO poi_ratings (poi_id, user_id, rating, "createdAt", "updatedAt") VALUES (:poiID, :userID, :rating, :createdAt, :updatedAt)`, {
        replacements: {
            createdAt: TODAY,
            poiID,
            rating,
            updatedAt: TODAY,
            userID
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.updatePOIRating = (poiID, userID, rating) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE poi_ratings SET rating = :rating, "updatedAt" = :updatedAt WHERE poi_id = :poiID AND user_id = :userID`, {
        replacements: {
            poiID,
            rating,
            updatedAt: TODAY,
            userID
        },
        type: db.QueryTypes.UPDATE
    });
};
