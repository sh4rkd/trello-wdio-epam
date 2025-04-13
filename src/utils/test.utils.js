/**
 * @fileoverview Utilities for tests
 * @module utils/test.utils
 */

/**
 * Generates a unique name for a board
 * @param {string} prefix - Prefix for the name
 * @returns {string} Unique name
 */
function generateUniqueBoardName(prefix = 'Test Board') {
  return `${prefix} ${Date.now()}`;
}

/**
 * Verifies that a response is successful
 * @param {Object} response - API response
 * @returns {boolean} true if the response is successful
 */
function isSuccessfulResponse(response) {
  return response && response.status >= 200 && response.status < 300;
}

/**
 * Verifies that an object has the required properties
 * @param {Object} obj - Object to verify
 * @param {Array<string>} requiredProps - List of required properties
 * @returns {boolean} true if the object has all required properties
 */
function hasRequiredProperties(obj, requiredProps) {
  return requiredProps.every(prop => obj.hasOwnProperty(prop));
}

/**
 * Limpia los recursos después de una prueba
 * @param {string} boardId - ID del tablero a eliminar
 * @param {Function} deleteFn - Función para eliminar el tablero
 * @returns {Promise<void>}
 */
async function cleanupTestResources(boardId, deleteFn) {
  if (boardId) {
    try {
      await deleteFn(boardId);
    } catch (error) {
      console.error(`Error cleaning up board ${boardId}:`, error.message);
    }
  }
}

module.exports = {
  generateUniqueBoardName,
  isSuccessfulResponse,
  hasRequiredProperties,
  cleanupTestResources,
}; 