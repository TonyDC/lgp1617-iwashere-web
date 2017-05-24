"use strict";

const db = require('../index');

module.exports.getAvailableRoles = (upperBoundRank) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT role_id, name, rank FROM roles WHERE rank >= :upperBoundRank`,
        {
            replacements: { upperBoundRank },
            type: db.QueryTypes.SELECT
        });
};
