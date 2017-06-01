const os = require('os');

const multer = require('multer');

const MAX_SIZE_MB = 50;
const KB = 1024;

const TEMP_DIR = os.tmpdir();

const MAX_NUMBER_OF_FIELDS = 20;
const MAX_NUMBER_OF_FILES = 10;

/*
Properties:
fieldNameSize      Max field name size           100 bytes
fieldSize        Max field value size 1MB
fields          Max number of non-file fields Infinity
fileSize        For multipart forms, the max file size (in bytes) Infinity
files            For multipart forms, the max number of file fields Infinity
parts            For multipart forms, the max number of parts (fields + files) Infinity
headerPairs    For multipart forms, the max number of header key=>value pairs to parse 2000
*/
const upload = multer({
    dest: TEMP_DIR,
    limits: {
        fields: MAX_NUMBER_OF_FIELDS,
        fileSize: MAX_SIZE_MB * KB * KB,
        files: MAX_NUMBER_OF_FILES
    }
});

module.exports = upload;
