"use strict";

const express = require('express');
const router = express.Router();

router.use('/poi', require('./poi'));

module.exports = router;
