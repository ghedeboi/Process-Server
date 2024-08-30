const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')
const fileController = require('../controllers/fileController');

// POST /api/files/upload
router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;