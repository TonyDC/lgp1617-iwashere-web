"use strict";

const db = require('../index');

module.exports.getUserByUID = (uid) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM users WHERE uid = :uid`, {
        replacements: { uid },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getUserByEmail = (email) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM users WHERE email = :email`, {
        replacements: { email },
        type: db.QueryTypes.SELECT
    });
};

module.exports.getContentEditorByUID = (uid) => {
    // language=POSTGRES-SQL
    return db.query(`SELECT * FROM content_editors WHERE uid = :uid`, {
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

module.exports.insertContentEditor = (uid) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO content_editors(uid) VALUES (:uid)`, {
        replacements: { uid },
        type: db.QueryTypes.INSERT
    });
};

module.exports.getUsersByEmailWithinContextAndRank = (email, rootContext, upperBoundRank) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT users.uid, users.name, users.email, user_contexts.context_id, roles.role_id, roles.rank, roles.name FROM users 
            INNER JOIN user_contexts ON (users.uid = user_contexts.user_id)
            INNER JOIN roles ON (user_contexts.role_id = roles.role_id)
            WHERE users.email = :email AND roles.rank >= :upperBoundRank
                AND user_contexts.context_id IN (
                WITH RECURSIVE children(context_id, parent_id) AS (
                    SELECT context_id, parent_id FROM contexts WHERE context_id = :rootContext
                        UNION
                    SELECT c.context_id, c.parent_id
                    FROM children p, contexts c
                    WHERE p.context_id = c.parent_id
                ) SELECT context_id FROM children
            )`,
        {
            replacements: {
                email,
                rootContext,
                upperBoundRank
            },
            type: db.QueryTypes.SELECT
        });
};

module.exports.getUserWithinContextAndRank = (uid, rootContext, upperBoundRank) => {
    // language=POSTGRES-PSQL
    return db.query(`SELECT users.uid, users.name, users.email, user_contexts.context_id, roles.role_id, roles.rank, roles.name 
            FROM users 
                INNER JOIN user_contexts ON (users.uid = user_contexts.user_id)
                INNER JOIN roles ON (user_contexts.role_id = roles.role_id)
            WHERE users.uid = :uid AND roles.rank >= :upperBoundRank
                AND user_contexts.context_id IN (
                WITH RECURSIVE children(context_id, parent_id) AS (
                    SELECT context_id, parent_id FROM contexts WHERE context_id = :rootContext
                        UNION
                    SELECT c.context_id, c.parent_id
                    FROM children p, contexts c
                    WHERE p.context_id = c.parent_id
                ) SELECT context_id FROM children
            )`,
        {
            replacements: {
                rootContext,
                uid,
                upperBoundRank
            },
            type: db.QueryTypes.SELECT
        });
};
