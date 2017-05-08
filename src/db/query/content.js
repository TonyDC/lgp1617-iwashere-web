"use strict";

const db = require('../index');

module.exports.getContentTypeByName = (contentTypeName) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT content_type_id FROM content_types WHERE name = :contentTypeName`, {
        replacements: { contentTypeName },
        type: db.QueryTypes.SELECT
    });
};
