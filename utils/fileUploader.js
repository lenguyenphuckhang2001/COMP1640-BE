const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  },
});

const fileUploader = () => {
  const upload = multer({
    storage: storage,
  });
  return upload;
};

module.exports = fileUploader;
