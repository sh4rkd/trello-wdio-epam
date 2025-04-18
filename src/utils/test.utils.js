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
  console.log(`Generating unique board name with prefix: "${prefix}"`);
  const uniqueName = `${prefix} ${Date.now()}`;
  console.log(`Generated unique name: "${uniqueName}"`);
  return uniqueName;
}

/**
 * Verifies that a response is successful
 * @param {Object} response - API response
 * @returns {boolean} true if the response is successful
 */
function isSuccessfulResponse(response) {
  console.log(`Checking if response with status ${response?.status} is successful`);
  const isSuccess = response && response.status >= 200 && response.status < 300;
  console.log(`Response status check result: ${isSuccess ? 'Successful' : 'Failed'}`);
  return isSuccess;
}

/**
 * Verifies that an object has the required properties
 * @param {Object} obj - Object to verify
 * @param {Array<string>} requiredProps - List of required properties
 * @returns {boolean} true if the object has all required properties
 */
function hasRequiredProperties(obj, requiredProps) {
  console.log(`Checking if object has required properties: ${requiredProps.join(', ')}`);
  const hasProps = requiredProps.every(prop => Object.prototype.hasOwnProperty.call(obj, prop));
  console.log(
    `Required properties check result: ${hasProps ? 'All properties found' : 'Missing properties'}`
  );
  return hasProps;
}

/**
 * Limpia los recursos después de una prueba
 * @param {string} boardId - ID del tablero a eliminar
 * @param {Function} deleteFn - Función para eliminar el tablero
 * @returns {Promise<void>}
 */
async function cleanupTestResources(boardId, deleteFn) {
  console.log(`Starting cleanup of test resources. Board ID: ${boardId || 'No board to clean'}`);
  if (boardId) {
    try {
      console.log(`Attempting to delete board with ID: ${boardId}`);
      await deleteFn(boardId);
      console.log(`Successfully deleted board with ID: ${boardId}`);
    } catch (error) {
      console.error(`Error cleaning up board ${boardId}:`, error.message);
    }
  } else {
    console.log('No board ID provided for cleanup');
  }
}

module.exports = {
  generateUniqueBoardName,
  isSuccessfulResponse,
  hasRequiredProperties,
  cleanupTestResources,
};
