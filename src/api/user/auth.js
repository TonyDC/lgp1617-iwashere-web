'use strict';

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.json({text: 'Login'}).end();
});

module.exports = router;
