"use strict";

const db = require('../index');

module.exports.getRandomFortuneCookie = () => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * FROM fortune_cookies OFFSET random() * ((SELECT COUNT(*) FROM fortune_cookies) - 1) LIMIT 1;`,
        {
            replacements: {},
            type: db.QueryTypes.SELECT
        });
};

module.exports.getAllFortuneCookies = () => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * FROM fortune_cookies;`,
        {
            replacements: {},
            type: db.QueryTypes.SELECT
        });
};

module.exports.getAllFortuneCookieByID = (id) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * FROM fortune_cookies WHERE fortune_cookie_id = :id;`,
        {
            replacements: { id },
            type: db.QueryTypes.SELECT
        });
};
