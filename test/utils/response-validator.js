const { expect } = require('chai');

class ResponseValidator {
  /**
   * Validates basic response properties
   * @param {Object} response - API response
   * @param {number} expectedStatus - Expected status code
   */
  static validateBasicResponse(response, expectedStatus = 200) {
    console.log(`Validating response: Status code is ${response.status} (expected ${expectedStatus})`);
    expect(response.status, `Status code should be ${expectedStatus}`).to.equal(expectedStatus);
    
    console.log(`Validating Content-Type header: ${response.headers['content-type']}`);
    expect(response.headers['content-type'], 'Content-Type header should be JSON').to.include('application/json');
    
    console.log('Basic response validation passed ✓');
  }

  /**
   * Validates response body properties
   * @param {Object} responseBody - Response body
   * @param {Object} expectedProps - Expected properties in {key: value} format
   */
  static validateResponseProperties(responseBody, expectedProps) {
    console.log('Validating response body properties:');
    
    for (const [key, value] of Object.entries(expectedProps)) {
      console.log(`  - Checking property "${key}"`);
      expect(responseBody, `Response should have property ${key}`).to.have.property(key);
      
      if (value !== undefined) {
        console.log(`  - Validating "${key}" value: "${responseBody[key]}" (expected: "${value}")`);
        expect(responseBody[key], `Property ${key} should have value ${value}`).to.equal(value);
      } else {
        console.log(`  - Property "${key}" exists with value: "${responseBody[key]}"`);
      }
    }
    
    console.log('Response body validation passed ✓');
  }
}

module.exports = ResponseValidator;