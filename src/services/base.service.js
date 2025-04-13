/**
 * @fileoverview Servicio base para manejar peticiones HTTP
 * @module services/base.service
 */

const axios = require('axios');
const config = require('../../config/config');

/**
 * @class BaseService
 * @description Clase base para servicios que realizan peticiones HTTP
 */
class BaseService {
  /**
   * @constructor
   * @param {Object} options - Opciones de configuración
   * @param {string} options.baseURL - URL base para las peticiones
   * @param {number} options.timeout - Tiempo de espera para las peticiones
   */
  constructor(options = {}) {
    this.client = axios.create({
      baseURL: options.baseURL || config.trello.baseUrl,
      timeout: options.timeout || config.trello.defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Realiza una petición GET
   * @param {string} url - URL del endpoint
   * @param {Object} params - Parámetros de la petición
   * @returns {Promise<Object>} Respuesta de la petición
   */
  async get(url, params = {}) {
    try {
      const response = await this.client.get(url, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Realiza una petición POST
   * @param {string} url - URL del endpoint
   * @param {Object} data - Datos a enviar
   * @param {Object} params - Parámetros de la petición
   * @returns {Promise<Object>} Respuesta de la petición
   */
  async post(url, data = {}, params = {}) {
    try {
      const response = await this.client.post(url, data, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Realiza una petición PUT
   * @param {string} url - URL del endpoint
   * @param {Object} data - Datos a enviar
   * @param {Object} params - Parámetros de la petición
   * @returns {Promise<Object>} Respuesta de la petición
   */
  async put(url, data = {}, params = {}) {
    try {
      const response = await this.client.put(url, data, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Realiza una petición DELETE
   * @param {string} url - URL del endpoint
   * @param {Object} params - Parámetros de la petición
   * @returns {Promise<Object>} Respuesta de la petición
   */
  async delete(url, params = {}) {
    try {
      const response = await this.client.delete(url, { params });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Maneja los errores de las peticiones
   * @param {Error} error - Error de la petición
   * @throws {Error} Error con información detallada
   */
  handleError(error) {
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || error.message}`);
    }
    throw error;
  }
}

module.exports = BaseService; 