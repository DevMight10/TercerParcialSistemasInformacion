const express = require('express');
const cors = require('cors');
const loteRoutes = require('./routes/lote.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/lotes', loteRoutes);

module.exports = app;
