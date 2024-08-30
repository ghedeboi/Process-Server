// src/middleware/multer.js
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size (10MB)
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf|docx|mp4|avi/; // Allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  }
});

module.exports = upload;
