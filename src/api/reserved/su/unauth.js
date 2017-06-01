'use strict';

const express = require('express');
const router = express.Router();

/*
const firebaseAdmin = require('firebase-admin');

router.post('/login', (req, res) => {
    const authModule = firebaseAdmin.auth();
    const token = authModule.createCustomToken('123', { userType: 1 });

    res.json({ token }).end();
});
*/

module.exports = router;
