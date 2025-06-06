const serverless = require('serverless-http');
const app = require('../src/app');

// Exporta no formato que Vercel exige
module.exports = serverless(app);
