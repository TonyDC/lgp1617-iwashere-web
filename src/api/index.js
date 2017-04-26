"use strict";

const httpCode = require('http-status-codes');

const express = require('express');
const router = express.Router();

// For example purposes
router.use('/example', require('./example'));

// User-related endpoints
router.use('/user', require('./user'));

// POI-related endpoints
router.use('/poi', require('./poi'));

// Post-related endpoints
router.use('/post', require('./post'));

// Tag-related endpoints
router.use('/tag', require('./tag'));

// No API endpoint found
router.use((req, res) => {
    res.sendStatus(httpCode.NOT_IMPLEMENTED).end();
});

module.exports = router;
