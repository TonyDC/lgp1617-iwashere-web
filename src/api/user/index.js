"use strict";

const express = require('express');
const router = express.Router();

router.use('/unauth', require('./unauth'));

// Check if user is authenticated
router.use('/auth', (req, res, next) => {
    const { user } = req.body;

    if (user === 'adc') {
        return next();
    }

    res.sendStatus(401).end();

    return null;
});

router.use('/auth', require('./auth'));

module.exports = router;
