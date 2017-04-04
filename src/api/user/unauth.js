'use strict';

const express = require('express');
const router = express.Router();

 // Required imports
const firebase = require('firebase');
const firebaseAdmin = require('firebase-admin');
const httpStatus = require('http-status-codes');

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
 // Example with Firebase Admin SDK

router.post('/register', (req, res) => {
    const { email, password, confirmPassword, username} = req.body;

    if (typeof password !== 'string' || typeof confirmPassword !== 'string' || password !== confirmPassword) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: "passwords-not-equal",
            message: 'Bad password confirmation'
        }).
            end();

        return;
    }

    if (typeof username !== 'string' || username.length === 0) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: "username-invalid",
            message: 'Invalid username'
        }).
            end();
    }

    // TODO check input

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
        // TODO register into database

        return firebaseAdmin.auth().createCustomToken(userRecord.uid);
    }).
    then((customToken) => {
        res.json({token: customToken}).end();
    }).
    catch((error) => {
        console.log("Error creating new user:", error);
        res.status(httpStatus.CONFLICT).end();
    });
});

/**
 * After registration through 3rd party services (Facebook, Google, ...) we need to add custom data to our service (username, etc...)
 * This request is for that.
 * Body properties:
 *  - username
 */
router.put('/register/third-party', (req, res) => {
    const { username} = req.body;

    if (typeof username !== 'string' || username.length === 0) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: "username-invalid",
            message: 'Invalid username'
        }).
        end();
    }

    // Not sure if this is the correct way of extracting the accessToken
    const token = req.getAccessToken();
    firebaseAdmin.auth().verifyIdToken(token).
        then((decodedToken) => {
            const uid = decodedToken.uid;
            // TODO Verify is username already exists and if not add it to the database associated to the userid
        }).
        catch((error) => {
            console.log("Error in third-party registration api call", error);
            res.status(httpStatus.CONFLICT).end();
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    firebase.auth().signInWithEmailAndPassword(email, password).
    then(() => {
        // TODO Add remaing form fields to the database
        res.end();
    }).
    catch((error) => {
        // Handle Errors here.
        const { code, message, response } = error;
        const status = response
            ? response.status
            : httpStatus.CONFLICT;

        res.status(status).json({
            code,
            message
        }).
        end();
    });
});

module.exports = router;
