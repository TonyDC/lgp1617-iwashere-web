'use strict';

const formidable = require('formidable');

module.exports = (opts) => {
    return (req, res, next) => {
        // Each request must generate a new formidable.IncomingForm object. Otherwise, a 'headers already sent' error is raised.
        const form = new formidable.IncomingForm();
        Object.assign(form, opts);

        form.parse(req, (err, fields, files) => {
            if (err) {
                return next(err);
            }

            Object.assign(req, {
                fields,
                files
            });

            return next();
        });

        form.on('progress', (bytesReceived, totalBytes) => {
            console.log(bytesReceived, totalBytes);
        });
    };
};


