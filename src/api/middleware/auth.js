"use strict";

const httpCodes = require('http-status-codes');
const firebaseAdmin = require('firebase-admin');

const authBodyLength = 2,
    authTypeIndex = 0,
    tokenIndex = 1;

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
    if (authArray.length !== authBodyLength || authArray[authTypeIndex].trim() !== 'Bearer') {
        res.sendStatus(httpCodes.UNAUTHORIZED).end();

        return;
    }

    const token = authArray[tokenIndex].trim();
    firebaseAdmin.auth().verifyIdToken(token).
    then((decodedToken) => {
        req.auth = { token: decodedToken };
        next();
    }).
    catch((error) => {
        console.error(error);
        res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR).end();
    });
}

module.exports.firebaseAuth = firebaseAuth;
