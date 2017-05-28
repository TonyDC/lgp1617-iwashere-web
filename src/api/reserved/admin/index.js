"use strict";

const express = require('express');
const router = express.Router();

router.use('/', require('./misc'));
router.use('/user', require('./user'));

module.exports = router;
