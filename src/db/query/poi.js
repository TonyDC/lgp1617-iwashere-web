"use strict";

const db = require('../index');

module.exports.getPOIDetail = (id) => {
    return db.query(`SELECT * FROM pois WHERE id = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};
