"use strict";

const db = require('../index');

module.exports.getContextsByUserIDAndMinimumRank = (userID, minimumRank) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * 
            FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) 
            WHERE user_id = :userID AND rank <= :minimumRank AND user_contexts.active IS TRUE`,
        {
            replacements: {
                minimumRank,
                userID
            },
            type: db.QueryTypes.SELECT
        });
};

module.exports.getContextsByUserID = (userID) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * 
            FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) 
            WHERE user_id = :userID AND user_contexts.active IS TRUE`,
        {
            replacements: { userID },
            type: db.QueryTypes.SELECT
        });
};
