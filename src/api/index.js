"use strict";

const express = require('express');
const router = express.Router();

// For example purposes
router.use('/example', require('./example'));

// User-related endpoints
router.use('/user', require('./user'));

// No API endpoint found
router.use((req, res) => {
    res.sendStatus(400).end();
});

module.exports = router;
