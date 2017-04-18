"use strict";

const httpCodes = require('http-status-codes');
const firebaseAdmin = require('firebase-admin');

const AUTH_BODY_LENGTH = 2,
    AUTH_TYPE_INDEX = 0,
    TOKEN_INDEX = 1;

const ELEMENT_NOT_FOUND_ARRAY = -1;

/**
 * Fireabse Authentication ExpressJS middleware
 *
 * The request object gains a new property `req.auth.token`, containing information about the logged user
 *
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The next middleware callback
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

module.exports.firebaseAuth = firebaseAuth;
