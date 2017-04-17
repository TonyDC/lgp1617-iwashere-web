"use strict";

const db = require('../index');

module.exports.getPOIDetail = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM pois WHERE id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};
