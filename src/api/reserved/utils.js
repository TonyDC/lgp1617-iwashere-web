'use strict';

const express = require('express');
const router = express.Router();

const httpCodes = require('http-status-codes');

const db = root_require('src/db/query');

const CONTENT_EDITOR_TYPE = 1;
const ADMINISTRATOR = 2;

router.get('/user-type', (req, res, next) => {
    const { uid } = req.auth.token;
    if (!uid || typeof uid !== 'string') {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { contentEditorDB, adminDB } = db;
    Promise.all([contentEditorDB.getContentEditor(uid), adminDB.getAdmin(uid)]).
    then((results) => {
        if (results && results.length >= 2) {
            if (results[0] && results[0].length > 0 && results[0][0]) {
                res.json({ type: CONTENT_EDITOR_TYPE }).end();
            } else if (results[1] && results[1].length > 0 && results[1][0]) {
                res.json({ type: ADMINISTRATOR }).end();
            } else {
                res.sendStatus(httpCodes.UNAUTHORIZED).end();
            }
        } else {
            res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
