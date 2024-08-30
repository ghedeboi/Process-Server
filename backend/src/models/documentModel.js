const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    caseReference: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true },
    documentType: { type: String, enum: ['Affidavit of Service', 'Affidavit of Attempted Service', 'Affidavit of Alternate Service'], required: true },
    generatedDate: { type: Date, default: Date.now },
    fileReference: { type: mongoose.Schema.Types.ObjectId, ref: 'File' }
});

module.exports = mongoose.model('Document', documentSchema);