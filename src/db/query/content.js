"use strict";

const db = require('../index');

module.exports.getContentTypeByName = (contentTypeName) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM content_types WHERE name = :contentTypeName`, {
        replacements: { contentTypeName },
        type: db.QueryTypes.INSERT
    });
};
