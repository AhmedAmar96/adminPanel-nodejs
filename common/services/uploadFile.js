const multer = require("multer");
const sharp = require("sharp");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.mimetype.replace("/", "."))
    },
});

function fileFilter(req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > 5000000) {
            // To reject this file pass `false`, like so:
            cb(null, false);
        } else {
            // To accept the file pass `true`, like so:
            cb(null, true)
        }
    } else {
        // To reject this file pass `false`, like so:
        cb(null, false)
    }
}


const upload = multer({ storage, fileFilter });

module.exports = upload;