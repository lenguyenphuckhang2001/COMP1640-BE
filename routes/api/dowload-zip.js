var express = require('express');
var router = express.Router();
const JSZip = require('jszip');
const getUploadedFiles = require('../../utils/getUploadedFiles');
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res, next) => {
  const zip = new JSZip();
  const removepath = __dirname.replace('routes\\api', '');
  // Read all the uploaded files and add them to the ZIP archive
  const files = await getUploadedFiles();
  files.forEach((file) => {
    const filePath = path.join(removepath, 'uploads', file);
    const fileData = fs.readFileSync(filePath);
    zip.file(file, fileData);
  });

  // Set up the response headers to indicate that we're sending a ZIP file
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="uploads.zip"');

  // Send the ZIP file to the client as a stream
  const zipData = await zip.generateAsync({ type: 'nodebuffer' });
  res.send(zipData);
});

module.exports = router;
