// tests/getWarehouses.test.js

const warehouseService = require('../services/warehouseService'); // Import the service
const warehousesController = require('../controllers/warehouseController'); // Import the controller

// Mock the warehouse service module
jest.mock('../services/warehouseService', () => ({
  getAllWarehouses: jest.fn() // Ensure getAllWarehouses is properly mocked
}));

describe('GET /warehouses', () => {

  // Test 1: Check the response status code and the returned data
  it('should return a 200 status code and a list of warehouses', () => {
    // Mock the service to return warehouse data
    const mockWarehouses = [
      { id: 1, name: 'Warehouse 1', location: 'Location 1' },
      { id: 2, name: 'Warehouse 2', location: 'Location 2' }
    ];

    warehouseService.getAllWarehouses.mockReturnValue(mockWarehouses); // Mock the return value of the service

    // Mock the req and res objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(), // Mock the status method
      json: jest.fn() // Mock the json method
    };

    // Call the controller function
    warehousesController.getWarehouses(req, res);

    // Assertions: Check if the status and json methods were called with the correct values
    expect(res.status).toHaveBeenCalledWith(200); // Expect status 200
    expect(res.json).toHaveBeenCalledWith(mockWarehouses); // Expect the correct data
  });

  // Test 2: Handle empty warehouse list
  it('should return an empty array when no warehouses are available', () => {
    // Mock the service to return an empty array
    const mockWarehouses = [];

    warehouseService.getAllWarehouses.mockReturnValue(mockWarehouses);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    warehousesController.getWarehouses(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200); // Expect status 200
    expect(res.json).toHaveBeenCalledWith(mockWarehouses); // Expect an empty array
  });
});
