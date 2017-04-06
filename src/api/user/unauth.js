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

    } else if (!validator.isEmail(email)) {
        res.status(httpStatus.BAD_REQUEST).send({message: 'Bad email'}).
        end();

        return;

    } else if (typeof name !== 'string' || validator.isEmpty(name.trim())) {
        res.status(httpStatus.BAD_REQUEST).send({message: 'Bad user name'}).
        end();

        return;
    }

    // ************************

    User.findOne({ where: { email } }).then((user) => {
        // User will be the first entry of the MainUser table || null
        return user
            ? new Error('User with the given email already exists')
            : null;

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

module.exports = router;
