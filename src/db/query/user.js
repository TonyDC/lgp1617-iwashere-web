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

module.exports.insertUser = (uid, name, email) => {
    // language=POSTGRES-SQL
    return db.query(`INSERT INTO users(uid, name, email) VALUES (:uid, :name, :email)`, {
        replacements: {
            email,
            name,
            uid
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.insertUserWithContextAndRole = (uid, name, email, contextID, roleID) => {
    // language=POSTGRES-SQL
    return db.query(`
        INSERT INTO users(uid, name, email) VALUES (:uid, :name, :email);
        INSERT INTO user_contexts(user_id, context_id, role_id) VALUES (:uid, :contextID, :roleID);
    `, {
        replacements: {
            contextID,
            email,
            name,
            roleID,
            uid
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.updateUser = (uid, name, removeContext = false) => {
    const withContextRemove = removeContext ? `UPDATE user_contexts SET active` : '';

    // language=POSTGRES-SQL
    return db.query(`UPDATE users SET name = :name WHERE uid = :uid; ${withContextRemove}`, {
        replacements: {
            name,
            uid
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.updateUserWithContextAndRole = (uid, name, contextID, roleID) => {
    // language=POSTGRES-SQL
    return db.query(`
        UPDATE users SET name = :name WHERE uid = :uid;
        UPDATE user_contexts SET context_id = :contextID, role_id = :roleID WHERE user_id = :uid;
    `, {
        replacements: {
            contextID,
            name,
            roleID,
            uid
        },
        type: db.QueryTypes.INSERT
    });
};

module.exports.updateUserSuspension = (uid, suspended) => {
    // language=POSTGRES-SQL
    return db.query(`UPDATE users SET suspended = :suspended WHERE uid = :uid`, {
        replacements: {
            suspended,
            uid
        },
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
    return db.query(`SELECT users.uid, users.name as name, users.email, user_contexts.context_id, roles.role_id, roles.rank, roles.name as role_name FROM users 
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
    return db.query(`SELECT users.uid, users.name, users.email, user_contexts.context_id, roles.role_id, roles.rank, roles.name, users.suspended, 
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
