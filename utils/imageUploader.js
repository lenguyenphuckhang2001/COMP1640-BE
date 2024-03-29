const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  },
});

const imageUploader = (max_size, allowed_file_types, error_msg) => {
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(error_msg), false);
      }
    },
  });
  return upload;
};

module.exports = imageUploader;
