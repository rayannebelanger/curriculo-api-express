const serverless = require('serverless-http');
const app = require('../src/app');

module.exports = app; // para rodar local
module.exports.handler = serverless(app); // para rodar no Vercel
