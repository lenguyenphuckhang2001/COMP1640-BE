const fs = require('fs').promises;
const path = require('path');

async function getUploadedFiles() {
  try {
    const removepath = __dirname.replace('utils', '');
    const uploadsDir = path.join(removepath, '/public/files');
    console.log('🚀 ~ file: getUploadedFiles.js:7 ~ getUploadedFiles ~ uploadsDir:', uploadsDir);
    const files = await fs.readdir(uploadsDir);
    return files;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
module.exports = getUploadedFiles;
