'use strict';

const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.json({text: 'Hello'}).end();
});

module.exports = router;
