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

module.exports.getContextByIDAndUserID = (contextID, userID, activeVerification = false) => {
    let activeVerificationSQL = '';
    if (activeVerification) {
        activeVerificationSQL = `AND user_contexts.active IS TRUE`;
    }

    // language=POSTGRES-PSQL
    return db.query(`SELECT user_contexts.user_id, user_contexts.context_id, roles.name AS role_name, contexts.name AS context_name, user_contexts.role_id, active, rank
            FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) INNER JOIN contexts ON (user_contexts.context_id = contexts.context_id)
            WHERE user_contexts.user_id = :userID AND user_contexts.context_id = :contextID ${activeVerificationSQL}`,
        {
            replacements: {
                contextID,
                userID
            },
            type: db.QueryTypes.SELECT
        });
};

module.exports.getContextsByUserID = (userID) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT user_contexts.user_id, user_contexts.context_id, roles.name AS role_name, contexts.name AS context_name, user_contexts.role_id, active, rank
            FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) INNER JOIN contexts ON (user_contexts.context_id = contexts.context_id)
            WHERE user_id = :userID AND user_contexts.active IS TRUE`,
        {
            replacements: { userID },
            type: db.QueryTypes.SELECT
        });
};

module.exports.getContextsByUserIDAndWithMinRank = (userID, minRank) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT user_contexts.user_id, user_contexts.context_id, roles.name AS role_name, contexts.name AS context_name, user_contexts.role_id, active, rank
            FROM user_contexts INNER JOIN roles ON (user_contexts.role_id = roles.role_id) INNER JOIN contexts ON (user_contexts.context_id = contexts.context_id)
            WHERE user_id = :userID AND user_contexts.active IS TRUE AND roles.rank <= :minRank`,
        {
            replacements: {
                minRank,
                userID
            },
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

module.exports.getChildContexts = (rootContextID) => {
    // language=POSTGRES-PSQL
    return db.query(`
        WITH RECURSIVE children(context_id, parent_id, name) AS (
            SELECT context_id, parent_id, name FROM contexts WHERE context_id = :rootContextID
                UNION
            SELECT c.context_id, c.parent_id, c.name
            FROM children p, contexts c
            WHERE p.context_id = c.parent_id
        ) SELECT * FROM children;`,
        {
            replacements: { rootContextID },
            type: db.QueryTypes.SELECT
        });
};
