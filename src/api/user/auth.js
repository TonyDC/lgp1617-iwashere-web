'use strict';

const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req);
    res.json({text: 'Login'}).end();
});

module.exports = router;
