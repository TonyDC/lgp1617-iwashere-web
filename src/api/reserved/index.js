"use strict";

const express = require('express');
const router = express.Router();

const { firebaseAuth, verifyContentEditor, verifyAdmin } = require('../middleware/auth');

// Check if user is authenticated and belongs to the Firebase set of users
router.use('/', firebaseAuth);
router.use('/', require('./utils'));

// Check if user is content editor
router.use('/content-editor', verifyContentEditor);
router.use('/content-editor', require('./content-editor'));

// Check if user is administrator
router.use('/admin', verifyAdmin);
router.use('/admin', require('./admin'));

module.exports = router;
