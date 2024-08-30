const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

// POST /api/cases
router.post('/', caseController.createCase);

// GET /api/cases/:id
router.get('/:id', caseController.getCaseById);

// PUT /api/cases/:id
router.put('/:id', caseController.updateCase);

// DELETE /api/cases/:id
router.delete('/:id', caseController.deleteCase);

module.exports = router;
