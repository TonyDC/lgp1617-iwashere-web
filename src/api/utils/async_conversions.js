"use strict";

const crypto = require('crypto');
const fs = require('fs');
const storage = require('@google-cloud/storage');
const { Magic, MAGIC_MIME_TYPE } = require('mmmagic');

const config = require('../../../config');

// Authenticating on a per-API-basis.
const gcs = storage({
    keyFilename: config.FIREBASE_ADMIN_SDK_PATH,
    projectId: config.FIREBASE_CONFIG.projectId
});

// Reference an existing bucket.
const bucket = gcs.bucket(config.FIREBASE_CONFIG.storageBucket);

/**
 * Detects the type of file
 * @param file the path to the file
 * @returns {Promise}
 */
module.exports.detectFile = (file) => {
    const magic = new Magic(MAGIC_MIME_TYPE);

    return new Promise((resolve, reject) => {
        magic.detectFile(file, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

/**
 * Remove file from file system
 * @param file The path to the file
 * @returns {Promise}
 */
module.exports.unlink = (file) => {
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

/**
 * Send file to Firebase Cloud Storage
 * @param src the path to the file
 * @param dest the path in Firebase Storage
 * @param metadata optional metadata parameters
 * @returns {Promise}
 */
module.exports.sendFileToFirebase = (src, dest, metadata) => {
    return new Promise((resolve, reject) => {
        const tempReadStream = fs.createReadStream(src);
        const remoteWriteStream = bucket.file(dest).createWriteStream({ metadata });
        tempReadStream.pipe(remoteWriteStream).
        on('error', (err) => {
            reject(err);
        }).
        on('finish', () => {
            // http://stackoverflow.com/questions/19277094/how-to-close-a-readable-stream-before-end
            // http://stackoverflow.com/questions/20796902/deleting-file-in-node-js
            tempReadStream.close();
            resolve({
                dest,
                src
            });
        });
    });
};


module.exports.getHashOfFile = (file, date = Date.now()) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        hash.setEncoding('hex');
        hash.update(String(date));
        const input = fs.createReadStream(file);
        hash.on('finish', () => {
            // http://stackoverflow.com/questions/19277094/how-to-close-a-readable-stream-before-end
            // http://stackoverflow.com/questions/20796902/deleting-file-in-node-js
            input.close();
            // Here, the hash is already digested
            resolve(hash.read());
        });
        input.on('error', () => {
            reject(new Error('Failed to obtain SHA256'));
        });
        input.pipe(hash);
    });
};
