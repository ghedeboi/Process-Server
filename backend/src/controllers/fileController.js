const File = require('../models/fileModel');
const path = require('path');
const fs = require('fs');

// Upload a file
exports.uploadFile = (req, res) => {
    const { originalname, mimetype, path: filePath} =req.file;

    const newFile = new File({
        fileName: originalname,
        fileType: mimetype,
        filePath
    });

    newFile.save()
        .then(file => res.status(201).json({ message: 'File uploaded successfully', file}))
        .catch(err => res.status(500).json({ message: 'Failed to upload file', error: err.message}));
};