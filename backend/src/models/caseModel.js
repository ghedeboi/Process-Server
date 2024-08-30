const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    caseId: { type: String, required: true, unique: true },
    clientName: { type: String, required: true },
    defendantName: { type: String, required: true },
    serviceAddress: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
    serviceStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
