const multer = require("multer")
const path = require("path");

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log(req.file)
        cb(null, './public/image')
        },
        filename: function (req, file, cb) {
            const splitName = file.originalname.split('.');
            const ext = splitName.pop();
            const newName = splitName.join('-');
            cb(null, `${Date.now()}-${newName}.${ext}`);
        },
    });

    let limits = {
        fileSize: 5 * 1000 * 1000,
    };

    let fileFilter = (req, file, cb) => {
        const mime = /jpg|webp|gif|png|jpeg|svg/;
        const extName = mime.test(path.extname(file.originalname).toLowerCase());
        if (extName) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    let upload = multer({ storage, limits, fileFilter }).single('photo')


module.exports = upload;