"use strict";

const express = require('express');
const router = express.Router();

router.use('/', require('./all'));

module.exports = router;
