'use strict';

const express = require('express');
const router = express.Router();

const firebaseAdmin = require('firebase-admin');
const httpStatus = require('http-status-codes');
const validator = require('validator');

/**
 * Register endpoint
 * Body properties:
 *  - email
 *  - password
 *  - confirmPassword
 *  - name
 *
 * See: https://firebase.google.com/docs/auth/admin/manage-users
 */

router.post('/register', (req, res) => {
    const { email, password, confirmPassword, username } = req.body;

    if (typeof password !== 'string' || typeof confirmPassword !== 'string' || password !== confirmPassword) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: 'bad-password',
            message: 'Bad password'
        }).
        end();

        return;

    } else if (typeof email !== 'string' || !validator.isEmail(email)) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: 'bad-email',
            message: 'Bad email'
        }).
        end();

        return;

    } else if (typeof username !== 'string' || validator.isEmpty(username.trim())) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: 'bad-username',
            message: 'Bad username'
        }).
        end();

        return;
    }

    firebaseAdmin.auth().createUser({
        disabled: false,
        displayName: username,
        email,
        emailVerified: false,
        password
    }).
    then((user) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user.", user);
        res.send({
            ok: true,
            user
        }).
        end();
    }).
    catch((error) => {
        console.error("Error creating new user:", error.errorInfo);
        res.status(httpStatus.BAD_REQUEST).send({
            code: error.code,
            error: error.errorInfo,
            ok: false
        }).
        end();
    });
});

module.exports = router;
