// external imports
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// creating new storage
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `avatar-${Date.now()}`,
  },
});

// export module
module.exports = avatarStorage;
