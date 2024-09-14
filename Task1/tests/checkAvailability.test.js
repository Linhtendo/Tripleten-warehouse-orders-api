const warehouseService = require('../services/warehouseService'); // Import the service
const warehouseController = require('../controllers/warehouseController'); // Import the controller

// Mock the warehouse service
jest.mock('../services/warehouseService');

describe('POST /api/v1/warehouses/check', () => {

  // Test 1: Check the response status code and availability of goods
  it('Should return a 200 status code and the correct availability of goods', () => {
    // Mock the input goods and the expected service response
    const mockGoods = [
      { name: 'Bananas', quantity: 50 },
      { name: 'Pineapples', quantity: 200 }
    ];
    const mockAvailability = [
      { name: 'Bananas', available: true },
      { name: 'Pineapples', available: false }
    ];

    // Mock the service to return the expected availability response
    warehouseService.checkGoodsAvailability.mockReturnValue(mockAvailability);

    // Mock the req and res objects
    const req = { body: { goods: mockGoods } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    warehouseController.checkAvailability(req, res);

    // Assertions: Check if the status and json methods were called with the correct values
    expect(res.status).toHaveBeenCalledWith(200); // Expect status 200
    expect(res.json).toHaveBeenCalledWith(mockAvailability); // Expect the correct availability data

    // Check the parsed response body
    const responseData = res.json.mock.calls[0][0]; // Get the response data
    expect(Array.isArray(responseData)).toBe(true); // Check if it's an array
    expect(responseData[0]).toHaveProperty('name', 'Bananas'); // Check first good
    expect(responseData[0]).toHaveProperty('available', true); // Check availability
    expect(responseData[1]).toHaveProperty('name', 'Pineapples');
    expect(responseData[1]).toHaveProperty('available', false);
  });

  // Test 2: Handle an empty goods list and check for a correct response
  it('Should return a 200 status code and an empty array when no goods are provided', () => {
    // Mock the service to return an empty array
    warehouseService.checkGoodsAvailability.mockReturnValue([]);

    // Mock the req and res objects
    const req = { body: { goods: [] } }; // Empty array in the request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    warehouseController.checkAvailability(req, res);

    // Assertions: Check the response status and data
    expect(res.status).toHaveBeenCalledWith(200); // Expect status 200
    expect(res.json).toHaveBeenCalledWith([]); // Expect an empty array

    // Parse the response and check it's an empty array
    const responseData = res.json.mock.calls[0][0];
    expect(Array.isArray(responseData)).toBe(true);
    expect(responseData.length).toBe(0); // Should be an empty array
  });

});