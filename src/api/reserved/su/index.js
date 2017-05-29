"use strict";

const express = require('express');
const router = express.Router();

const authMiddlewares = require('../../middleware/auth');

router.use('/', require('./all'));

router.use('/unauth', require('./unauth'));

// Check if user is authenticated
router.use('/auth', authMiddlewares.firebaseAuth);
router.use('/auth', require('./auth'));

module.exports = router;
