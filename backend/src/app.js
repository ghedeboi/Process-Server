const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import the routes
const fileRoutes = require('./routes/fileRoutes');
const caseRoutes = require('./routes/caseRoutes');
const documentRoutes = require('./routes/documentRoutes');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use('/api/files', fileRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/documents', documentRoutes);

// Basic route for health check
app.get('/', (req, res) => {
    res.send('Server is up and running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`)))
    .catch(err => console.log(err));
