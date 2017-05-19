'use strict';

const express = require('express');
const router = express.Router();

const firebaseAdmin = require('firebase-admin');
const httpStatus = require('http-status-codes');
const validator = require('validator');

const db = root_require('src/db/query');

const ONE_INDEX = 1,
    ZERO_INDEX = 0;

const NO_ELEMENTS_SIZE = 0,
    TWO_ELEMENTS_SIZE = 2;

/**
 * Register endpoint
 * Body properties:
 *  - email
 *  - password
 *  - confirmPassword
 *  - username
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
        res.send({
            ok: true,
            user
        }).
        end();
    }).
    catch((error) => {
        res.status(httpStatus.BAD_REQUEST).send({
            code: error.code,
            error: error.errorInfo
        }).
        end();
    });
});

router.post('/register-by-provider', (req, res, next) => {
    const { uid } = req.body;
    const { userDB } = db;

    Promise.all([firebaseAdmin.auth().getUser(uid), userDB.getUserByUID(uid)]).
    then((results) => {
        if (!results || results.length !== TWO_ELEMENTS_SIZE || !results[ZERO_INDEX] || !results[ZERO_INDEX].providerData || !results[ONE_INDEX]) {
            return Promise.reject(new Error('Bad promise fulfilment'));
        } else if (results[ZERO_INDEX].providerData.length === NO_ELEMENTS_SIZE) {
            res.status(httpStatus.BAD_REQUEST).json({ message: 'the user is not authenticated by provider' }).
            end();
        } else if (results[ONE_INDEX].length === NO_ELEMENTS_SIZE) {
            return userDB.insertUser(uid).
            then(() => {
                res.sendStatus(httpStatus.CREATED).end();
            });
        } else {
            res.end();
        }

        return null;
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
