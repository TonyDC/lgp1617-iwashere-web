"use strict";

const db = require('../index');

module.exports.getAllTags = () => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM tags`, {
        replacements: {},
        type: db.QueryTypes.SELECT
    });
};
