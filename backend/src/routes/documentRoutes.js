const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// POST /api/documents/generate
router.post('/generate', documentController.generateDocument);

// GET /api/documents/:id
router.get('/:id', documentController.getDocumentById);

module.exports = router;
