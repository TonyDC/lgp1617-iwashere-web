"use strict";

const moment = require('moment');
const TODAY = moment().format();

const db = require('../index');

module.exports.getUserByUID = (uid) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM users WHERE uid = :uid`, {
        replacements: { uid },
        type: db.QueryTypes.SELECT
    });
};
