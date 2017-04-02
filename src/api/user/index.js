"use strict";

const httpCodes = require('http-status-codes');
const firebaseAdmin = require('firebase-admin');
const express = require('express');
const router = express.Router();


router.use('/unauth', require('./unauth'));

// Check if user is authenticated
router.use('/auth', (req, res, next) => {
    const authBodyLength = 2,
        authTypeIndex = 0,
        tokenIndex = 1;

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
});

router.use('/auth', require('./auth'));

module.exports = router;
