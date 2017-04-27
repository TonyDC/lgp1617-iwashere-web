"use strict";

const db = require('../index');

module.exports.getRouteDetailByID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM routes WHERE route_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIsByRouteID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * 
    FROM route_pois INNER JOIN pois ON route_pois.poi_id = pois.poi_id
    WHERE route_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getTagsByRouteID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM route_tags WHERE route_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getRatingByRouteID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT AVG(rating) AS rating, COUNT(*) AS ratings 
    FROM (SELECT DISTINCT ON (user_id) * FROM route_ratings WHERE route_id = :id
    ORDER BY user_id, created_at DESC) current_ratings`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getRatingByUserID = (routeID, userID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM route_ratings WHERE route_id = :routeID AND user_id = :userID
    ORDER BY created_at DESC LIMIT 1`, {
        replacements: {
            routeID,
            userID
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.addRouteRating = (routeID, userID, rating) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO route_ratings(user_id, route_id, rating) VALUES (:userID, :routeID, :rating)`, {
        replacements: {
            rating,
            routeID,
            userID
        },
        type: db.QueryTypes.INSERT
    });
};
