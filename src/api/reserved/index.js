"use strict";

const SU_RANK = 0;
const ADMIN_RANK = 1;
const CONTENT_EDITOR_RANK = 2;

const express = require('express');
const router = express.Router();

const { firebaseAuth, verifyUserPermissions } = require('../middleware/auth');

// Check if user is authenticated and belongs to the Firebase set of users
router.use('/', firebaseAuth);
router.use('/', require('./utils'));

// Check if user is content editor
router.use('/content-editor', verifyUserPermissions(CONTENT_EDITOR_RANK));
router.use('/content-editor', require('./content-editor'));

// Check if user is administrator
router.use('/admin', verifyUserPermissions(ADMIN_RANK));
router.use('/admin', require('./admin'));

// Check if user is su
router.use('/admin', verifyUserPermissions(SU_RANK));
router.use('/admin', require('./su'));

module.exports = router;
