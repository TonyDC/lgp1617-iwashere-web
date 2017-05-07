'use strict';

const formidable = require('formidable');

module.exports = (opts) => {
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
        if (contentTypeValue.length < 1) {
            return next();
        }
        const contentTypeMIME = contentTypeValue[0].trim();
        if (contentTypeMIME !== 'multipart/form-data') {
            return next();
        }

        // Each request must generate a new formidable.IncomingForm object. Otherwise, a 'headers already sent' error is raised.
        const form = new formidable.IncomingForm();
        Object.assign(form, opts);

        return form.parse(req, (err, fields, files) => {
            if (err) {
                return next(err);
            }

            Object.assign(req, {
                fields,
                files
            });

            return next();
        });

        /*
        form.on('progress', (bytesReceived, totalBytes) => {
            console.log(bytesReceived, totalBytes);
        });
        */
    };
};


