"use strict";

const fs = require('fs');
const storage = require('@google-cloud/storage');
const { Magic, MAGIC_MIME_TYPE } = require('mmmagic');

const sharp = require('sharp');

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

module.exports.resizeImageToPNG = (filename, output, size) => {
    return new Promise((resolve, reject) => {
        sharp(filename).resize(size).
        png().
        toFile(output, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports.resizeImageToJPG = (src, dest, newName, size) => {
    return new Promise((resolve, reject) => {
        sharp(filename).resize(size).
        jpeg().
        toFile(output, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};
