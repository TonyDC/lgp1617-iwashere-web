'use strict';

const express = require('express');
const router = express.Router();

const firebaseAdmin = require('firebase-admin');
const httpStatus = require('http-status-codes');
const validator = require('validator');

const { User } = root_require('models');

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

    // ************************

    User.findOne({ where: { email } }).then((user) => {
        // User will be the first entry of the MainUser table || null
        if (user) {
            return new Error('User with the given email already exists');
        }

        return null;
    }).
    then(() => {
        return firebaseAdmin.auth().createUser({
            disabled: false,
            displayName: name,
            email,
            emailVerified: false,
            password
        });
    }).
    then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord);

        return User.create({
            email,
            uid: userRecord.uid
        });
    }).
    then((user) => {
        console.log(`Successfully inserted new user into database: ${user}`);
        res.end();
    }).
    catch((error) => {
        console.error("Error creating new user:", error);
        res.status(httpStatus.BAD_REQUEST).end();
    });
});

module.exports = router;
