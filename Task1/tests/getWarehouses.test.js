// tests/getWarehouses.test.js

// Import the necessary modules
const warehouseService = require('../services/warehouseService');
const warehouseController = require('../controllers/warehouseController'); // Adjust the path to your controller

jest.mock('../services/warehouseService'); // Mock the service

describe('GET /api/v1/warehouses', () => {

  it('Should return a 200 status code when retrieving the warehouses', () => {
    // Mock the response from the service
    warehouseService.getAllWarehouses.mockReturnValue([{ id: 1, name: 'Warehouse 1' }]);

    // Mock the req and res objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    warehouseController.getWarehouses(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200); // Checking if status is 200
  });

  it('Should return a valid response body structure with id and name properties', () => {
    // Mock the response from the service
    warehouseService.getAllWarehouses.mockReturnValue([{ id: 1, name: 'Warehouse 1' }]);

    // Mock the req and res objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    warehouseController.getWarehouses(req, res);

    // Assertions
    const responseBody = res.json.mock.calls[0][0];
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toHaveProperty('name');
  });
});
