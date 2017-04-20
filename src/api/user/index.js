"use strict";

const httpCodes = require('http-status-codes');
const express = require('express');
const router = express.Router();

const authMiddlewares = require('../middleware/auth');

const ELEMENT_NOT_FOUND_ARRAY = -1;

router.use('/unauth', require('./unauth'));

// Check if user is authenticated
router.use('/auth', authMiddlewares.firebaseAuth);
router.use('/auth', require('./auth'));

router.use((err, req, res, next) => {
    if (err && err.errorInfo) {
        const { code } = err.errorInfo;

        // Check https://firebase.google.com/docs/auth/admin/errors
        if (['auth/operation-not-allowed', 'auth/invalid-credential', 'auth/project-not-found', 'auth/insufficient-permission', 'auth/internal-error'].indexOf(code) !== ELEMENT_NOT_FOUND_ARRAY) {
            return next(err);
        }

        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return null;
    }

    return next(err);
});

module.exports = router;
