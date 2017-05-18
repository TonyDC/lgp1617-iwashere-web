"use strict";

const db = require('../index');

module.exports.getContextByUserIDAndMinimumRank = (userID, contextID, minimumRank) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * 
            FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) 
            WHERE user_id = :userID AND context_id = :contextID AND rank <= :minimumRank AND user_contexts.active IS TRUE`,
        {
            replacements: {
                contextID,
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

module.exports.verifyUserContext = (userID, contextID) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT * 
            FROM user_contexts 
            WHERE user_id = :userID AND context_id = :contextID user_contexts.active IS TRUE`,
        {
            replacements: {
                contextID,
                userID
            },
            type: db.QueryTypes.SELECT
        });
};

module.exports.verifyContextUnderUserJurisdiction = (contextID, childContextID) => {
    // language=POSTGRES-PSQL
    return db.query(`
        WITH RECURSIVE path(context_id, parent_id, name) AS (
                SELECT context_id, parent_id, name FROM contexts WHERE context_id = :childContextID
                    UNION
                SELECT c.context_id, c.parent_id, c.name
                FROM path p, contexts c
                WHERE c.context_id = p.parent_id
        ) SELECT * FROM PATH WHERE context_id = :contextID`,
        {
            replacements: {
                childContextID,
                contextID
            },
            type: db.QueryTypes.SELECT
        });
};
