"use strict";

const db = require('../index');

module.exports.getAdmin = (id) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM administrators WHERE uid = :id`, {
        replacements: { id },
        type: db.QueryTypes.SELECT
    });
};
