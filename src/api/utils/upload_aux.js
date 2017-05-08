'use strict';

const pathModule = require('path');
const async = require('async');
const sharp = require('sharp');

const { sendFileToFirebase, unlink, detectFile, getHashOfFile } = require('../utils/async_conversions');

const SUPPORTED_TYPES = ['image/jpeg', 'image/png'];
const JPEG_INDEX = SUPPORTED_TYPES.indexOf('image/jpeg');
const PNG_INDEX = SUPPORTED_TYPES.indexOf('image/png');
const ZERO_INDEX = 0;

function processFiles (uid) {
    return (fileItem, callback) => {
        const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = fileItem;
        const response = {};
        let contentTypeName = null;

        detectFile(path).then((type) => {
            const typeIndex = SUPPORTED_TYPES.indexOf(type);

            let extension = null;
            switch (typeIndex) {
                case JPEG_INDEX:
                    extension = 'jpeg';
                    contentTypeName = 'image/imagem';
                    break;
                case PNG_INDEX:
                    extension = 'png';
                    contentTypeName = 'image/imagem';
                    break;
                default:
                    return callback({
                        code: 1,
                        message: 'Bad file format.'
                    });
            }

            return sharp(path).metadata().
            then((metadata) => {
                const { width } = metadata;

                const dirname = pathModule.dirname(path);
                const paths = [
                    {
                        basename: `xsmall_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `xsmall_${filename}.${extension}`),
                        size: 200
                    },
                    {
                        basename: `small_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `small_${filename}.${extension}`),
                        size: 400
                    },
                    {
                        basename: `medium_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `medium_${filename}.${extension}`),
                        size: 800
                    },
                    {
                        basename: `large_${filename}.${extension}`,
                        dir: pathModule.join(dirname, `large_${filename}.${extension}`),
                        size: 1200
                    }
                ];
                const promises = paths.map((obj) => {
                    let sharpObject = sharp(path).resize(Math.min(width, obj.size));
                    switch (typeIndex) {
                        case JPEG_INDEX:
                            sharpObject = sharpObject.jpeg();
                            break;
                        case PNG_INDEX:
                            sharpObject = sharpObject.png();
                            break;
                        default:
                            return callback({
                                error: {
                                    code: 1,
                                    message: 'Bad file format.'
                                }
                            });
                    }

                    return sharpObject.toFile(obj.dir).
                    then(() => {
                        return obj;
                    }).
                    catch((error) => {
                        return Object.assign({}, obj, { error });
                    });
                });
                promises.push(Promise.resolve({
                    basename: `original_${filename}.${extension}`,
                    dir: path,
                    size: width
                }));

                return Promise.all(promises);
            }).
            then((arrays) => {
                return Promise.all(arrays.map((imageInfo) => {
                    const { basename, dir } = imageInfo;

                    return getHashOfFile(dir).
                    then((hash) => {
                        response.contentHash = hash;
                        response.contentUrl = `${uid}/${hash} - ${size} - ${basename}`; // TODO check if this is correct

                        return sendFileToFirebase(dir, `${uid}/${hash} - ${size} - ${basename}`);
                    });
                }));
            }).
            then((arrays) => {
                return Promise.all(arrays.map((imagePathObj) => {
                    return unlink(imagePathObj.src);
                }));
            }).
            then(() => {
                db.contentDB.getContentTypeByName(contentTypeName);
            }).
            then((contentTypeId) => {
                console.log(contentTypeId);
                response.contentTypeId = contentTypeId[ZERO_INDEX];

                return callback(null, response);
            });
        }).
        catch((error) => {
            // TODO unlink files
            callback({
                code: 2,
                message: error
            });
        });
    };
}

module.exports.handleFileUpload = (files, userId) => {
    return new Promise((fulfill, reject) => {
        async.map(files, processFiles(userId), (error, fileInfo) => {
            if (error) {
                reject(error);
            }

            fulfill(fileInfo);
        });
    });
};
