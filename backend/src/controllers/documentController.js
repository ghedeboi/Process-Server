const Document = require('../models/documentModel');
const Case = require('../models/caseModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Generate a document
exports.generateDocument = (req, res) => {
    const { caseId, documentType } = req.body;

    Case.findById(caseId)
        .then(caseData => {
            if (!caseData) {
                return res.status(404).json({ message: 'Case not found' });
            }

            const doc = new PDFDocument();
            const filePath = `./generatedDocuments/${caseId}_${documentType}.pdf`;
            doc.pipe(fs.createWriteStream(filePath));

            // Add document content based on documentType and caseData
            doc.text(`Document Type: ${documentType}`);
            doc.text(`Client Name: ${caseData.clientName}`);
            doc.text(`Defendant Name: ${caseData.defendantName}`);
            // Additional content...

            doc.end();

            const newDocument = new Document({
                caseId,
                documentType,
                filePath
            });

            newDocument.save()
                .then(document => res.status(201).json({ message: 'Document generated successfully', document }))
                .catch(err => res.status(500).json({ message: 'Failed to generate document', error: err.message }));
        })
        .catch(err => res.status(500).json({ message: 'Failed to retrieve case', error: err.message }));
};

// Get document by ID
exports.getDocumentById = (req, res) => {
    Document.findById(req.params.id)
        .then(document => {
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }

            res.download(document.filePath);
        })
        .catch(err => res.status(500).json({ message: 'Failed to retrieve document', error: err.message }));
};
