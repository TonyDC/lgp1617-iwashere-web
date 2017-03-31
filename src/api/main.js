/* eslint-disable no-ternary */

"use strict";

const express = require('express');
const firebase = require('firebase');
const router = express.Router();
const httpStatus = require('http-status-codes');

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    firebase.auth().createUserWithEmailAndPassword(email, password).
        catch((error) => {
            // Handle Errors here.
            const { code, message } = error;
            const status = error.response
                ? error.response.status
                : httpStatus.CONFLICT;
            res.status(status).json(
                {
                    code,
                    message
                }
            );
        });

    const { nickname } = req.body;

    // TODO Add remaing form fields to the database


});

module.exports = router;
