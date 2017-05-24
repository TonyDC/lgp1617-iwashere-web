"use strict";

const httpCodes = require('http-status-codes');
const firebaseAdmin = require('firebase-admin');

const db = root_require('./src/db/query');

const AUTH_BODY_LENGTH = 2,
    AUTH_TYPE_INDEX = 0,
    TOKEN_INDEX = 1;

const ELEMENT_NOT_FOUND_ARRAY = -1;
const NO_ELEMENTS = 0;

/**
 * Firebase ExpressJS Authentication middleware
 *
 * The request object gains a new property `req.auth.token`, containing information about the logged user
 *
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {function} next The next middleware callback
 *
 * @return {void}
 */
function firebaseAuth (req, res, next) {
    const authorization = req.header('Authorization');
    if (!authorization || typeof authorization !== 'string') {
        res.sendStatus(httpCodes.UNAUTHORIZED).end();

        return;
    }

    const authArray = authorization.split(' ');
    if (authArray.length !== AUTH_BODY_LENGTH || authArray[AUTH_TYPE_INDEX].trim() !== 'Bearer') {
        res.sendStatus(httpCodes.UNAUTHORIZED).end();

        return;
    }

    const token = authArray[TOKEN_INDEX].trim();
    firebaseAdmin.auth().verifyIdToken(token).
    then((decodedToken) => {
        req.auth = { token: decodedToken };
        next();
    }).
    catch((error) => {
        // If 'next' is different than 'route', it is considered as an error and the error handler is invoked.
        const { code } = error.errorInfo;

        // Check https://firebase.google.com/docs/auth/admin/errors
        if (['auth/operation-not-allowed', 'auth/invalid-credential', 'auth/project-not-found', 'auth/insufficient-permission', 'auth/internal-error'].indexOf(code) !== ELEMENT_NOT_FOUND_ARRAY) {
            return next(error);
        }

        res.sendStatus(httpCodes.UNAUTHORIZED).end();

        return null;
    });
}

/**
 * Check if the user is associated to a context, with the given minimum role rank
 * @param {number} minimumRank the minimum rank
 * @returns {function(*, *, *)} the ExpressJS function handler
 */
function verifyUserPermissions (minimumRank) {
    return (req, res, next) => {
        const { uid } = req.auth.token;
        if (!uid || typeof uid !== 'string') {
            res.sendStatus(httpCodes.BAD_REQUEST).end();

            return null;
        }

        let context = req.header('X-user-context');
        if (!context || typeof context !== 'string') {
            res.status(httpCodes.BAD_REQUEST).json({ message: '\'X-user-context\' header must be provided' }).
            end();

            return null;
        }

        context = context.trim();
        const { userContextDB } = db;

        return userContextDB.getContextByUserIDAndMinimumRank(uid, context, minimumRank).
        then((results) => {
            if (results && results.length > NO_ELEMENTS) {
                const [{ rank }] = results;
                req.auth.contextID = context;
                req.auth.rank = rank;

                return next();
            }

            res.status(httpCodes.UNAUTHORIZED).json({ message: 'User without enough permissions' }).
            end();

            return null;
        }).
        catch((error) => {
            next(error);
        });
    };
}

module.exports.firebaseAuth = firebaseAuth;
module.exports.verifyUserPermissions = verifyUserPermissions;
