/* eslint-disable no-ternary */

"use strict";

const express = require('express');
const firebase = require('firebase');
const router = express.Router();
const httpStatus = require('http-status-codes');

router.post('/register', (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.status(httpStatus.BAD_REQUEST).json(
            {
                code: "passwords-not-equal",
                message: "The passwords don't match"

            });
    }

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


    // TODO Add remaing form fields to the database
});

module.exports = router;
