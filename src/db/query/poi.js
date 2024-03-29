"use strict";

const db = require('../index');
const withPoiRatings = `WITH poi_ratings AS (SELECT AVG(rating) AS rating, poi_id
                    FROM (SELECT DISTINCT ON (user_id) poi_id, rating FROM poi_ratings
                    ORDER BY user_id, created_at DESC) current_ratings GROUP BY poi_id)`;
const orderByRatingAndName = `ORDER BY poi_ratings.rating DESC NULLS LAST, name`;
const orderByDistanceRatingAndName = `ORDER BY distance, poi_ratings.rating DESC NULLS LAST, name`;

module.exports.getPOIByID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT pois.*, poi_types.name AS type
    FROM pois INNER JOIN poi_types ON pois.poi_type_id = poi_types.poi_type_id WHERE pois.poi_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIDetailByID = (id, deleted = false) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT pois.*, poi_types.name AS type FROM pois INNER JOIN poi_types ON pois.poi_type_id = poi_types.poi_type_id 
    WHERE pois.poi_id = :id AND (pois.deleted = FALSE OR :deleted)`, {
        replacements: {
            deleted,
            id
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOITypeByID = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM poi_types WHERE poi_type_id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIsByID = (poiIdList, deleted = false) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT pois.*, poi_types.name AS type FROM pois INNER JOIN poi_types ON pois.poi_type_id = poi_types.poi_type_id 
    WHERE pois.poi_id = ANY(:poiIdList) AND (pois.deleted = FALSE OR :deleted)`, {
        replacements: {
            deleted,
            poiIdList
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOITags = (poiID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT tags.name, tags.tag_id FROM poi_tags INNER JOIN tags ON poi_tags.tag_id = tags.tag_id WHERE poi_tags.poi_id = :poiID`, {
        replacements: { poiID },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIsWithin = (minLat, maxLat, minLng, maxLng) => {
    // language=POSTGRES-PSQL
    return db.query(`${withPoiRatings} SELECT *, CASE WHEN rating IS NULL THEN 0 ELSE rating END AS rating, pois.poi_id
    FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
    WHERE latitude >= :minLat AND latitude <= :maxLat AND longitude >= :minLng AND longitude <= :maxLng AND pois.deleted = FALSE`, {
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
    WHERE poi_contents.poi_id = :poiId AND poi_contents.deleted = FALSE`, {
        replacements: { poiId },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getPOIMedia = (poiIdList) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT *, name AS type 
    FROM poi_contents INNER JOIN content_types ON poi_contents.content_type_id = content_types.content_type_id
    WHERE content_types.content_type_id = '1' AND poi_contents.deleted = FALSE AND poi_contents.poi_id = ANY(:poiIdList)`, {
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
    return db.query(`SELECT rating FROM poi_ratings  WHERE poi_id = :poiID AND user_id = :userID ORDER BY created_at DESC LIMIT 1`, {
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
    return db.query(`SELECT * FROM pois WHERE text @@ to_tsquery(:query) AND pois.deleted IS FALSE`, {
        replacements: { query },
        type: db.QueryTypes.SELECT
    });
};

module.exports.searchNearbyPOI = (query, lat, lng) => {
    // language=POSTGRES-SQL
    return db.query(`${withPoiRatings} SELECT *, CASE WHEN rating IS NULL THEN 0 ELSE rating END AS rating, pois.poi_id, get_distance_function(latitude::real, longitude::real, :lat::real, :lng::real) as distance
    FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
    WHERE text @@ to_tsquery(:query) AND pois.deleted IS FALSE ${orderByDistanceRatingAndName}`, {
        replacements: {
            lat,
            lng,
            query
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getNearbyPOIs = (lat, lng, limit) => {
    // language=POSTGRES-PSQL
    return db.query(`${withPoiRatings} SELECT *, get_distance_function(latitude::real, longitude::real, :lat::real, :lng::real) as distance 
    FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
    WHERE pois.deleted = FALSE ${orderByDistanceRatingAndName} LIMIT :limit`, {
        replacements: {
            lat,
            limit,
            lng
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getTopRatedPOIs = (limit) => {
    // language=POSTGRES-PSQL
    return db.query(`${withPoiRatings} SELECT * FROM pois LEFT JOIN poi_ratings ON pois.poi_id = poi_ratings.poi_id
    WHERE pois.deleted = FALSE ${orderByRatingAndName} LIMIT :limit`, {
        replacements: { limit },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getAllPOITypes = () => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM poi_types`, {
        replacements: { },
        type: db.QueryTypes.SELECT
    });
};

module.exports.createPOI = (name, description, address, latitude, longitude, poiTypeId, editorId, contextId, metaInfo, parentId = null) => {
    // language=POSTGRES-PSQL
    return db.query(`INSERT INTO pois(name, description, address, latitude, longitude, poi_type_id, parent_id, content_editor_id, context_id, meta_info) 
    VALUES (:name, :description, :address, :latitude, :longitude, :poiTypeId, :parentId, :editorId, :contextId, :metaInfo) RETURNING poi_id`, {
        replacements: {
            address,
            contextId,
            description,
            editorId,
            latitude,
            longitude,
            metaInfo,
            name,
            parentId,
            poiTypeId
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.setPOITags = (poiId, tagIdList) => {
    // language=POSTGRES-PSQL
    return db.query(`DELETE FROM poi_tags WHERE poi_id = :poiId;
    INSERT INTO poi_tags(poi_id, tag_id) VALUES (:poiId, unnest(array[:tagIdList])) ON CONFLICT DO NOTHING RETURNING tag_id`, {
        replacements: {
            poiId,
            tagIdList
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.getContentEditorPOI = (userID, poiID) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM pois WHERE pois.deleted = FALSE AND poi_id = :poiID AND user_id = :userID`, {
        replacements: {
            poiID,
            userID
        },
        type: db.QueryTypes.SELECT
    });
};

module.exports.setPOIDeleted = (poiID, userID, deleted = true) => {
    // language=POSTGRES-PSQL
    return db.query(`UPDATE pois SET deleted = :deleted, update_content_editor_id = :userID WHERE poi_id = :poiID`, {
        replacements: {
            deleted,
            poiID,
            userID
        },
        type: db.QueryTypes.UPDATE
    });
};

module.exports.addPOIContent = (poiId, contentTypeId, urlXs, urlS, urlM, urlL) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO poi_contents(poi_id, content_type_id, url_xs, url_s, url_m, url_l) 
    VALUES(:poiId, :contentTypeId, :urlXs, :urlS, :urlM, :urlL) RETURNING poi_content_id`, {
        replacements: {
            contentTypeId,
            poiId,
            urlL,
            urlM,
            urlS,
            urlXs
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.setPOIContentDeleted = (poiContentIdList, deleted = true) => {
    // language=POSTGRES-PSQL
    return db.query(`UPDATE poi_contents SET deleted = :deleted WHERE poi_content_id = ANY(array[:poiContentIdList]::bigint[])`, {
        replacements: {
            deleted,
            poiContentIdList
        },
        type: db.QueryTypes.UPDATE
    });
};

module.exports.updatePOI = (poiID, contentEditorID, name, description, address, latitude, longitude, poiTypeId, contextID, metaInfo, parentID = null) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE pois SET name = :name, description = :description, address = :address, latitude = :latitude, longitude = :longitude,
    poi_type_id = :poiTypeId, context_id = :contextID, parent_id = :parentID, update_content_editor_id = :contentEditorID, meta_info = :metaInfo 
    WHERE poi_id = :poiID`, {
        replacements: {
            address,
            contentEditorID,
            contextID,
            description,
            latitude,
            longitude,
            metaInfo,
            name,
            parentID,
            poiID,
            poiTypeId
        },
        type: db.QueryTypes.UPDATE
    });
};

module.exports.searchPOIsUnderContexts = (query, rootContextID, simplified = false) => {
    const projection = simplified ? '*' : 'poi_id, name, description, address';

    // language=POSTGRES-SQL
    return db.query(`SELECT ${projection} FROM pois WHERE text @@ to_tsquery(:query) AND context_id IN (
    WITH RECURSIVE children(context_id, parent_id, name) AS (SELECT context_id, parent_id, name FROM contexts WHERE context_id = :rootContextID
    UNION SELECT c.context_id, c.parent_id, c.name
    FROM children p, contexts c WHERE p.context_id = c.parent_id) SELECT context_id FROM children)`, {
        replacements: {
            query,
            rootContextID
        },
        type: db.QueryTypes.SELECT
    });
};
