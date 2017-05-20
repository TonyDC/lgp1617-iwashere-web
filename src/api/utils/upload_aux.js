'use strict';

const db = root_require('src/db/query');
const utils = require('../utils/misc');
const pathModule = require('path');
const async = require('async');
const sharp = require('sharp');

const { sendFileToFirebase, unlink, detectFile, getHashOfFile } = require('../utils/async_conversions');

const IMAGE_TYPE = 'image;imagem';
const SUPPORTED_TYPES = ['image/jpeg', 'image/png'];
const JPEG_INDEX = SUPPORTED_TYPES.indexOf('image/jpeg');
const PNG_INDEX = SUPPORTED_TYPES.indexOf('image/png');
const ZERO_INDEX = 0;
const NO_ERROR = 0;
const BAD_REQUEST_MSG_CODE = 1;
const INTERNAL_ERROR_MSG_CODE = 2;

/**
 * Creates a file on firebase under ./<uid>, returning its url and contentTypeId.
 * If the file is of IMAGE_TYPE, several files are created with different sizes.
 * @param {string} uid the uid of the file's owner
 * @return {function( {}, func)} function handler
 */
function processFiles (uid) {
    return (fileItem, callback) => {
        const { contentDB } = db;
        const { filename, path, size } = fileItem;
        const fileInfo = {
            contentTypeId: null,
            contentUrls: []
        };
        const filesToEliminate = [path];

        detectFile(path).then((type) => {
            let contentTypeName = null;
            const typeIndex = SUPPORTED_TYPES.indexOf(type);

            let extension = null;
            switch (typeIndex) {
                case JPEG_INDEX:
                    extension = 'jpeg';
                    contentTypeName = IMAGE_TYPE;
                    break;
                case PNG_INDEX:
                    extension = 'png';
                    contentTypeName = IMAGE_TYPE;
                    break;
                default:
                    return callback({
                        code: BAD_REQUEST_MSG_CODE,
                        filesToEliminate,
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
                                code: BAD_REQUEST_MSG_CODE,
                                filesToEliminate,
                                message: 'Bad file format.'
                            });
                    }

                    return sharpObject.toFile(obj.dir).
                    then(() => {
                        filesToEliminate.push(obj.dir);

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
                        const contentUrl = `${uid}/${hash} - ${size} - ${basename}`;
                        fileInfo.contentUrls.push(contentUrl);

                        return sendFileToFirebase(dir, contentUrl);
                    });
                }));
            }).
            then(() => {
                return contentDB.getContentTypeByName(contentTypeName);
            }).
            then((contentTypeId) => {
                fileInfo.contentTypeId = utils.convertObjectToCamelCase(contentTypeId[ZERO_INDEX]).contentTypeId;

                return callback(null, {
                    code: NO_ERROR,
                    fileInfo,
                    filesToEliminate
                });
            });
        }).
        catch((error) => {
            return callback({
                code: INTERNAL_ERROR_MSG_CODE,
                filesToEliminate,
                message: error
            });
        });
    };
}

module.exports.handleFileUpload = (files, userId) => {
    return new Promise((fulfill, reject) => {
        async.map(files, processFiles(userId), (error, response) => {
            const handler = () => {
                if (error) {
                    reject(error);
                }

                fulfill(response);
            };

            // unlink files
            const filesToEliminate = [];
            if (error) {
                filesToEliminate.concat(error.filesToEliminate);
            }

            if (response && response.length) {
                response.forEach((singleResponse) => {
                    filesToEliminate.concat(singleResponse.filesToEliminate);
                });
            }

            const filesToEliminatePromises = filesToEliminate.map((file) => {
                return unlink(file);
            });
            Promise.all(filesToEliminatePromises).then(handler).
            catch(handler);
        });
    });
};
