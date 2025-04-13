/**
 * @fileoverview Configuración de Cucumber
 */

const config = require('./config/config');

module.exports = {
  ...config.cucumber,
  // Opciones adicionales específicas de Cucumber
  publishQuiet: true,
  retry: 1,
  parallel: 2,
  tags: process.env.TAGS || '',
  worldParameters: {
    baseUrl: config.trello.baseUrl,
    apiKey: config.trello.apiKey,
    token: config.trello.token,
  },
}; 