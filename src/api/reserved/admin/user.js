'use strict';

const utils = require('../../utils/misc');

const httpCodes = require('http-status-codes');
const validator = require('validator');
const firebaseAdmin = require('firebase-admin');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const NO_ELEMENTS = 0;
const ONE_ELEMENT_SIZE = 1;
const TWO_ELEMENT_SIZE = 2;
const NOT_FOUND = -1;

const ZERO_INDEX = 0;
const ONE_INDEX = 1;
const TWO_INDEX = 2;

const THREE_SIZE = 3;

const MINIMUM_PASSWORD_SIZE = 6;

// Search for users by email
router.get('/search', (req, res, next) => {
    // ExpressJS automatically does URL decoding
    const { email } = utils.trimStringProperties(req.query);
    if (!email || typeof email !== 'string' || validator.isEmpty(email)) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { contextID, rank } = req.auth;

    const { userDB } = db;
    userDB.getUsersByEmailWithinContextAndRank(email, contextID, rank).
    then((results) => {
        if (results) {
            res.json(utils.convertObjectsToCamelCase(results)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

// Create a new user
router.post('/', (req, res, next) => {
    const { rank, contextID } = req.auth;
    const { context, email, name, password, role } = utils.trimStringProperties(req.body);

    if (typeof email !== 'string' || !validator.isEmail(email) ||
        typeof name !== 'string' || validator.isEmpty(name) ||
        typeof password !== 'string' || password.length < MINIMUM_PASSWORD_SIZE) {
        res.status(httpCodes.BAD_REQUEST).json({ message: 'Bad arguments' }).
        end();

        return;
    }

    const withContextAndRole = ['string', 'number'].indexOf(typeof context) !== NOT_FOUND && ['string', 'number'].indexOf(typeof role) !== NOT_FOUND;

    const { roleDB, userContextDB, userDB } = db;
    // Do not admit the custom registration of users having the same email
    userDB.getUserByEmail(email).
    then((results) => {
        if (Array.isArray(results) && results.length > NO_ELEMENTS) {
            res.sendStatus(httpCodes.CONFLICT).end();

            return null;
        }

        const checkContextAndRole = withContextAndRole ? [roleDB.getRoleByID(role), userContextDB.verifyContextUnderUserJurisdiction(contextID, context)] : [];

        return firebaseAdmin.auth().getUserByEmail(email).
        then((result) => {
            if (result) {
                res.sendStatus(httpCodes.CONFLICT).end();

                return null;
            }

            return Promise.all(checkContextAndRole);
        }).
        catch((error) => {
            const { code } = error.errorInfo;

            // Check https://firebase.google.com/docs/auth/admin/errors
            if (['auth/user-not-found'].indexOf(code) === NOT_FOUND) {
                return Promise.reject(error);
            }

            return Promise.all(checkContextAndRole);
        });
    }).
    then((checks) => {
        // CONFLICT
        if (!Array.isArray(checks)) {
            return null;
        }

        let contextToInsert = null,
            roleToInsert = null;

        if (withContextAndRole && checks.length > ONE_ELEMENT_SIZE) {
            const [roleResult, contextResult] = checks;

            if (Array.isArray(contextResult) && contextResult.length > NO_ELEMENTS &&
                Array.isArray(roleResult) && roleResult.length > NO_ELEMENTS && roleResult[ZERO_INDEX] && roleResult[ZERO_INDEX].rank >= rank) {
                contextToInsert = context;
                roleToInsert = role;
            } else {
                res.status(httpCodes.BAD_REQUEST).json({ message: 'Invalid context/role' }).
                end();

                return null;
            }
        }

        return firebaseAdmin.auth().createUser({
            disabled: false,
            displayName: name,
            email,
            emailVerified: false,
            password
        }).
        then((user) => {
            const { uid } = user;
            const insertUserPromise = withContextAndRole && contextToInsert !== null && roleToInsert !== null
                ? userDB.insertUserWithContextAndRole(uid, name, email, contextToInsert, roleToInsert)
                : userDB.insertUser(uid, name, email);

            return insertUserPromise.
            then(() => {
                // See the UserRecord reference doc for the contents of userRecord.
                res.end();
            });
        });
    }).
    catch((error) => {
        next(error);
    });
});

// Update user information
router.put('/:userID', (req, res, next) => {
    const { rank, contextID } = req.auth;
    const { userID } = req.params;
    const { context, name, password, role } = utils.trimStringProperties(req.body);

    if (typeof userID !== 'string' || validator.isEmpty(userID) ||
        typeof name !== 'string' || validator.isEmpty(name) ||
        (password !== null && (typeof password !== 'string' || password.length < MINIMUM_PASSWORD_SIZE))) {
        res.status(httpCodes.BAD_REQUEST).json({ message: 'Bad arguments' }).
        end();

        return;
    }

    const withContextAndRole = ['string', 'number'].indexOf(typeof context) !== NOT_FOUND && ['string', 'number'].indexOf(typeof role) !== NOT_FOUND;

    const { roleDB, userContextDB, userDB } = db;

    const checkUserPromises = [userDB.getUserByUID(userID), userDB.getUserWithinContextAndRank(userID, contextID, rank), firebaseAdmin.auth().getUser(userID)];

    Promise.all(checkUserPromises).
    then((results) => {
        const userRecords = results[ZERO_INDEX];
        const userInContext = results[ONE_INDEX];
        if (!Array.isArray(userRecords) || !Array.isArray(userInContext) || userRecords.length === NO_ELEMENTS || userInContext.length === NO_ELEMENTS) {
            res.status(httpCodes.BAD_REQUEST).send({ message: 'User not found' }).
            end();

            return null;
        }

        const checkContextAndRole = withContextAndRole ? [roleDB.getRoleByID(role), userContextDB.verifyContextUnderUserJurisdiction(contextID, context)] : [];

        return Promise.all(checkContextAndRole).then((checks) => {
            let contextToInsert = null,
                roleToInsert = null;

            if (withContextAndRole && Array.isArray(checks) && checks.length > ONE_ELEMENT_SIZE) {
                const [roleResult, contextResult] = checks;

                if (Array.isArray(contextResult) && contextResult.length > NO_ELEMENTS &&
                    Array.isArray(roleResult) && roleResult.length > NO_ELEMENTS && roleResult[ZERO_INDEX] && roleResult[ZERO_INDEX].rank >= rank) {
                    contextToInsert = context;
                    roleToInsert = role;
                } else {
                    res.status(httpCodes.BAD_REQUEST).json({ message: 'Invalid context/role' }).
                    end();

                    return null;
                }
            }

            const firebaseObject = { displayName: name };
            if (password !== null) {
                console.log('Password was set', password);
                firebaseObject.password = password;
            }

            return firebaseAdmin.auth().updateUser(userID, firebaseObject).
            then(() => {
                const insertUserPromise = withContextAndRole && contextToInsert !== null && roleToInsert !== null
                    ? userDB.updateUserWithContextAndRole(userID, name, contextToInsert, roleToInsert)
                    : userDB.updateUser(userID, name);

                return insertUserPromise.
                then(() => {
                    res.end();
                });
            });
        });
    }).
    catch((error) => {
        const { errorInfo } = error;
        if (typeof errorInfo !== 'object') {
            return next(error);
        }

        const { code } = error.errorInfo;
        // Check https://firebase.google.com/docs/auth/admin/errors
        if (['auth/user-not-found'].indexOf(code) !== NOT_FOUND) {
            return res.status(httpCodes.BAD_REQUEST).
            json({ message: 'User not found' }).
            end();
        }

        return next(error);
    });
});

// Disable user
router.post('/:userID/', (req, res, next) => {
    const { rank, contextID } = req.auth;
    const { userID } = req.params;
    const { suspended } = utils.trimStringProperties(req.body);

    if (typeof suspended !== 'boolean') {
        res.status(httpCodes.BAD_REQUEST).json({ message: 'Bad arguments' }).
        end();

        return;
    }
    const { userDB } = db;

    const checkUserPromises = [userDB.getUserByUID(userID), userDB.getUserWithinContextAndRank(userID, contextID, rank), firebaseAdmin.auth().getUser(userID)];

    Promise.all(checkUserPromises).
    then((results) => {
        const [userRecords, userInContext] = results;
        if (!Array.isArray(userRecords) || !Array.isArray(userInContext) ||
            userRecords.length === NO_ELEMENTS || userInContext.length === NO_ELEMENTS) {
            res.status(httpCodes.BAD_REQUEST).send({ message: 'User not found' }).
            end();

            return null;
        }

        return Promise.all([userDB.updateUserSuspension(userID, suspended), firebaseAdmin.auth().updateUser(userID, { disabled: suspended })]).
        then(() => {
            res.end();
        });
    }).
    catch((error) => {
        const { errorInfo } = error;
        if (typeof errorInfo !== 'object') {
            return next(error);
        }

        const { code } = error.errorInfo;
        // Check https://firebase.google.com/docs/auth/admin/errors
        if (['auth/user-not-found'].indexOf(code) !== NOT_FOUND) {
            return res.status(httpCodes.BAD_REQUEST).
            json({ message: 'User not found' }).
            end();
        }

        return next(error);
    });
});

router.get('/:userID', (req, res, next) => {
    const { userID } = req.params;
    const { contextID, rank } = req.auth;

    if (typeof userID !== 'string' || validator.isEmpty(userID)) {
        res.status(httpCodes.BAD_REQUEST).send({ message: 'Bad user ID' }).
            end();

        return;
    }

    const { userDB } = db;
    userDB.getUserWithinContextAndRank(userID, contextID, rank).
    then((results) => {
        if (results && Array.isArray(results) && results.length > NO_ELEMENTS) {
            res.json(utils.convertObjectsToCamelCase(results)).end();
        } else {
            res.sendStatus(httpCodes.NO_CONTENT).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
