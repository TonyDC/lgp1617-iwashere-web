'use strict';

const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/android', (req, res, next) => {
    res.download(path.join(__dirname, 'files', 'android.apk'), 'iwashere.apk', (err) => {
        if (err) {
            return next(err);
        }

        return null;
    });
});

module.exports = router;
