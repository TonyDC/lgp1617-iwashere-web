"use strict";

const fs = require('fs');
const storage = require('@google-cloud/storage');
const { Magic, MAGIC_MIME_TYPE } = require('mmmagic');

const config = require('../../../config');

// Authenticating on a per-API-basis.
const gcs = storage({
    keyFilename: config.FIREBASE_ADMIN_SDK_PATH,
    projectId: 'iwashere-mobile'
});

// Reference an existing bucket.
const bucket = gcs.bucket('iwashere-mobile.appspot.com');

/**
 *
 * @param file
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
 *
 * @param file
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
 *
 * @param src
 * @param dest
 * @param metadata
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
            resolve();
        });
    });
};

