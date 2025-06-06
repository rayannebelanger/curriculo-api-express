const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pessoasRoutes = require('./routes/pessoas');
const experienciasRoutes = require('./routes/experiencias');
const formacoesRoutes = require('./routes/formacoes');
const habilidadesRoutes = require('./routes/habilidades');

app.use('/pessoas', pessoasRoutes);
app.use('/experiencias', experienciasRoutes);
app.use('/formacoes', formacoesRoutes);
app.use('/habilidades', habilidadesRoutes);

module.exports = app;
