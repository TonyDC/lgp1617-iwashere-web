'use strict';

const WIDTH_MIME_TYPE = 1;
const MIME_TYPE_INDEX = 0;

const formidable = require('formidable');

module.exports = (opts = {}) => {
    return (req, res, next) => {
        const { method } = req;
        if (method !== 'POST') {
            return next();
        }

        const contentType = req.header('Content-Type');
        if (typeof contentType !== 'string') {
            return next();
        }
        const contentTypeValue = contentType.split(";");
        if (contentTypeValue.length < WIDTH_MIME_TYPE) {
            return next();
        }
        const contentTypeMIME = contentTypeValue[MIME_TYPE_INDEX].trim();
        if (contentTypeMIME !== 'multipart/form-data') {
            return next();
        }

        // Each request must generate a new formidable.IncomingForm object. Otherwise, a 'headers already sent' error is raised.
        const form = new formidable.IncomingForm();
        Object.assign(form, opts);

        form.parse(req, (err, fields, files) => {
            console.log(form.bytesExpected);

            if (err) {
                return next(err);
            }

            Object.assign(req, {
                fields,
                files
            });

            return next();
        });

        form.on('fileBegin', function(name, file) {
            console.log(name, file);

        });

        /*
        form.on('progress', (bytesReceived, totalBytes) => {
            console.log(bytesReceived, totalBytes);
        });
        */
    };
};


