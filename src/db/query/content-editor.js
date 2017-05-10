"use strict";

const db = require('../index');

module.exports.getContentEditor = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM content_editors WHERE uid = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};
