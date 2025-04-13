/**
 * @fileoverview Utilidades para las pruebas
 * @module utils/test.utils
 */

/**
 * Genera un nombre único para un tablero
 * @param {string} prefix - Prefijo para el nombre
 * @returns {string} Nombre único
 */
function generateUniqueBoardName(prefix = 'Test Board') {
  return `${prefix} ${Date.now()}`;
}

/**
 * Verifica que una respuesta sea exitosa
 * @param {Object} response - Respuesta de la API
 * @returns {boolean} true si la respuesta es exitosa
 */
function isSuccessfulResponse(response) {
  return response && response.status >= 200 && response.status < 300;
}

/**
 * Verifica que un objeto tenga las propiedades requeridas
 * @param {Object} obj - Objeto a verificar
 * @param {Array<string>} requiredProps - Lista de propiedades requeridas
 * @returns {boolean} true si el objeto tiene todas las propiedades requeridas
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