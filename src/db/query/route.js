"use strict";

const db = require('../index');

module.exports.getRouteDetailByID = (id, deleted = false) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM routes 
    WHERE route_id = :id AND (deleted = FALSE OR :deleted)`, {
        replacements: {
            deleted,
            id
        },
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

module.exports.searchRoute = (query) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM routes 
    WHERE text @@ to_tsquery(:query) AND deleted = FALSE`, {
        replacements: { query },
        type: db.QueryTypes.SELECT
    });
};

module.exports.createRoute = (name, description, editorId) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO 
    routes(name, description, content_editor_id) 
    VALUES (:name, :description, :editorId) 
    RETURNING route_id`, {
        replacements: {
            description,
            editorId,
            name
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.setRouteTags = (routeId, tagIdList) => {
    // language=POSTGRES-SQL
    return db.query(`
    DELETE FROM route_tags WHERE route_id = :routeId;
    INSERT INTO route_tags(route_id, tag_id)
    VALUES (:routeId, unnest(array[:tagIdList])) ON CONFLICT DO NOTHING RETURNING tag_id`, {
        replacements: {
            routeId,
            tagIdList
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.setRoutePOIs = (routeId, poiIdList) => {
    // language=POSTGRES-SQL
    return db.query(`
    DELETE FROM route_pois WHERE route_id = :routeId RETURNING poi_id;
    INSERT INTO route_pois(route_id, poi_id, poi_order)
    VALUES (:routeId, unnest(array[:poiIdList]), generate_series(1, :poiListLength)) ON CONFLICT DO NOTHING RETURNING poi_id`, {
        replacements: {
            poiIdList,
            poiListLength: poiIdList.length,
            routeId
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.getContentEditorRoute = (userID, routeID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *
    FROM routes
    WHERE route_id = :routeID AND user_id = :userId`, {
        replacements: {
            routeID,
            userID
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.updateRoute = (routeId, name, description) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE routes
    SET name = :name AND description = :description 
    WHERE route_id = :routeId
    RETURNING route_id`, {
        replacements: {
            description,
            name,
            routeId
        },
        type: db.QueryTypes.UPDATE
    });
};

module.exports.setRouteDeleted = (userID, routeID, deleted = true) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE ON routes
    SET deleted = :deleted
    WHERE poi_id = :poiID AND user_id = :userID`, {
        replacements: {
            deleted,
            routeID,
            userID
        },
        type: db.QueryTypes.UPDATE
    });
};

