
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const prescriptionRoutes = require('./routes/prescriptions');
const learningRoutes = require('./routes/learning');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/learning', learningRoutes);

app.listen(3001, () => console.log('✅ MCP Server running on port 3001'));
