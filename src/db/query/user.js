"use strict";

const db = require('../index');

module.exports.getUserByUID = (uid) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM users WHERE uid = :uid`, {
        replacements: { uid },
        type: db.QueryTypes.SELECT
    });
};

module.exports.insertUser = (uid) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO users(uid) VALUES (:uid)`, {
        replacements: { uid },
        type: db.QueryTypes.INSERT
    });
};

