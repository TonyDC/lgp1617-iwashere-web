const cryptoModule = require('crypto');
const pathModule = require('path');
const async = require('async');
const sharp = require('sharp');
const { sendFileToFirebase, unlink, detectFile, getHashOfFile } = require('../utils/async_conversions');
const upload = require('../middleware/upload');

const ELEMENT_NOT_FOUND = -1;
const ZERO_INDEX = 0;

function processFiles (uid) {
    return (fileItem, callback) => {
        console.log(fileItem);
        const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = fileItem;

        detectFile(path).then((type) => {
            const typeIndex = ['image/jpeg', 'image/png'].indexOf(type);
            if (typeIndex === ELEMENT_NOT_FOUND) {
                return callback({
                    code: 1,
                    message: 'Bad file format. Only JPEG or PNG are accepted.'
                });
            }

            const extension = typeIndex === 0
                ? 'jpeg'
                : 'png';

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
                    if (typeIndex === ZERO_INDEX) {
                        sharpObject = sharpObject.jpeg();
                    } else {
                        sharpObject = sharpObject.png();
                    }

                    return sharpObject.
                    toFile(obj.dir).
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
                        return sendFileToFirebase(dir, `${uid}/${hash} - ${size} - ${basename}`);
                    });
                }));
            }).
            then((arrays) => {
                return Promise.all(arrays.map((imagePathObj) => {
                    // return unlink(imagePathObj.src);
                    return null;
                }));
            }).
            then(() => {
                return callback();
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
        async.each(files, processFiles(userId), (err) => {
            if (err) {
                reject(err);
            }

            fulfill([{contentUrl, contentHash, contentTypeId}]);
        });
    });
};
