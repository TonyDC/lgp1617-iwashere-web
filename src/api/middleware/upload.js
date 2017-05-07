const os = require('os');

const multer = require('multer');

/*
 Properties:
fieldNameSize      Max field name size           100 bytes
fieldSize        Max field value size 1MB
fields	            Max number of non-file fields Infinity
fileSize        For multipart forms, the max file size (in bytes) Infinity
files            For multipart forms, the max number of file fields Infinity
parts            For multipart forms, the max number of parts (fields + files) Infinity
headerPairs    For multipart forms, the max number of header key=>value pairs to parse 2000
 */
const upload = multer({
    dest: os.tmpdir(),
    limits: {
        fields: 10,
        fileSize: 2 * 1024 * 1024,
        files: 5
    }
});

// const fieldsUploadTemplate = upload.fields([{ name: 'sample-file', maxCount: 6 }]);

module.exports = upload;
