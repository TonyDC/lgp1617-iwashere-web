"use strict";

const db = require('../index');

module.exports.getAllTags = () => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM tags`, {
        replacements: {},
        type: db.QueryTypes.SELECT
    });
};

module.exports.searchTag = (query) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM tags WHERE name @@ to_tsquery(:query) `, {
        replacements: { query },
        type: db.QueryTypes.SELECT
    });
};
