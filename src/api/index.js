"use strict";

const httpCode = require('http-status-codes');

const express = require('express');
const router = express.Router();

// For example purposes
router.use('/example', require('./example'));

// User-related endpoints
router.use('/user', require('./user'));

// User-related endpoints
router.use('/poi', require('./poi'));

// No API endpoint found
router.use((req, res) => {
    res.sendStatus(httpCode.NOT_IMPLEMENTED).end();
});

module.exports = router;
