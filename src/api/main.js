"use strict";

const express = require('express');
const router = express.Router();

router.get('/example', (req, res) => {
    res.send({text: 'This is a text'}).end();
});

module.exports = router;