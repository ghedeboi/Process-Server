const Case = require('../models/caseModel');

// Create a new case
exports.createCase = (req, res) => {
  const newCase = new Case(req.body);

  newCase.save()
    .then(caseData => res.status(201).json({ message: 'Case created successfully', case: caseData }))
    .catch(err => res.status(500).json({ message: 'Failed to create case', error: err.message }));
};

// Get case by ID
exports.getCaseById = (req, res) => {
  Case.findById(req.params.id)
    .then(caseData => {
      if (!caseData) {
        return res.status(404).json({ message: 'Case not found' });
      }
      res.status(200).json(caseData);
    })
    .catch(err => res.status(500).json({ message: 'Failed to retrieve case', error: err.message }));
};

// Update case by ID
exports.updateCase = (req, res) => {
  Case.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedCase => res.status(200).json({ message: 'Case updated successfully', case: updatedCase }))
    .catch(err => res.status(500).json({ message: 'Failed to update case', error: err.message }));
};

// Delete case by ID
exports.deleteCase = (req, res) => {
  Case.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Case deleted successfully' }))
    .catch(err => res.status(500).json({ message: 'Failed to delete case', error: err.message }));
};
