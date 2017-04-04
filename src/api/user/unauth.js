'use strict';

const express = require('express');
const router = express.Router();

const firebaseAdmin = require('firebase-admin');
const httpStatus = require('http-status-codes');
const validator = require('validator');

const { User } = root_require('./src/db/model');

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
    const { email, password, confirmPassword, name } = req.body;

    if (typeof password !== 'string' || typeof confirmPassword !== 'string' || password !== confirmPassword) {
        res.status(httpStatus.BAD_REQUEST).send({message: 'Bad password'}).
        end();

        return;
    }

    if (!validator.isEmail(email)) {
        res.status(httpStatus.BAD_REQUEST).send({message: 'Bad email'}).
        end();

        return;
    }

    if (typeof name !== 'string' || validator.isEmpty(name.trim())) {
        res.status(httpStatus.BAD_REQUEST).send({message: 'Bad user name'}).
        end();

        return;
    }

    firebaseAdmin.auth().createUser({
        disabled: false,
        displayName: name,
        email,
        emailVerified: false,
        password
    }).
    then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord);

        return User.MainUser.create({UID: userRecord.uid});
    }).
    then((user) => {
        console.log(`Successfully inserted new user into database: ${user}`);
        res.end();
    }).
    catch((error) => {
        console.log("Error creating new user:", error);

        res.status(httpStatus.INTERNAL_SERVER_ERROR).end();
    });
});

module.exports = router;
