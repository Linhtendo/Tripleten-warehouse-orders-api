const warehouseService = require('../services/warehouseService');
const warehouseController = require('../controllers/warehouseController');

jest.mock('../services/warehouseService');

describe('GET /api/v1/warehouses', () => {

  // Test 1: Check if the response status code is 200
  it('Should return a 200 status code when retrieving the warehouses', () => {
    warehouseService.getAllWarehouses.mockReturnValue([{ id: 1, name: 'Warehouse 1' }]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    warehouseController.getWarehouses(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // Test 2: Check the response body structure
  it('Should return a valid response body structure with id and name properties', () => {
    warehouseService.getAllWarehouses.mockReturnValue([{ id: 1, name: 'Warehouse 1' }]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    warehouseController.getWarehouses(req, res);

    const responseBody = res.json.mock.calls[0][0];
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toHaveProperty('name');
  });

  // Test 3: Handle service error and return a 500 status code
  it('Should return a 500 status code if there is an error retrieving warehouses', () => {
    warehouseService.getAllWarehouses.mockImplementation(() => {
      throw new Error('Database connection failed');
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    warehouseController.getWarehouses(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while retrieving warehouses' });
  });

});
