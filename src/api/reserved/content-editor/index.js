"use strict";

const express = require('express');
const router = express.Router();

router.use('/poi', require('./poi'));
router.use('/route', require('./route'));

module.exports = router;
