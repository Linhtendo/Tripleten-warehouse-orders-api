const warehouseService = require('../services/warehouseService');
const warehouseController = require('../controllers/warehouseController');

jest.mock('../services/warehouseService');

describe('POST /api/v1/warehouses/check', () => {

  // Test 1: Check if the response status code is 200
  it('Should return a 200 status code when checking availability of goods', () => {
    const mockGoods = [{ name: 'Bananas', quantity: 50 }, { name: 'Pineapples', quantity: 200 }];
    const mockAvailability = [{ name: 'Bananas', available: true }, { name: 'Pineapples', available: false }];

    warehouseService.checkGoodsAvailability.mockReturnValue(mockAvailability);

    const req = { body: { goods: mockGoods } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    warehouseController.checkAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // Test 2: Check the response body structure
  it('Should return the correct availability of goods in response', () => {
    const mockGoods = [{ name: 'Bananas', quantity: 50 }, { name: 'Pineapples', quantity: 200 }];
    const mockAvailability = [{ name: 'Bananas', available: true }, { name: 'Pineapples', available: false }];

    warehouseService.checkGoodsAvailability.mockReturnValue(mockAvailability);

    const req = { body: { goods: mockGoods } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    warehouseController.checkAvailability(req, res);

    const responseData = res.json.mock.calls[0][0];
    expect(responseData).toBeInstanceOf(Array);
    expect(responseData[0]).toHaveProperty('name', 'Bananas');
    expect(responseData[0]).toHaveProperty('available', true);
    expect(responseData[1]).toHaveProperty('name', 'Pineapples');
    expect(responseData[1]).toHaveProperty('available', false);
  });

  // Test 3: Handle invalid goods input and return a 400 error
  it('Should return a 400 status code when goods input is invalid', () => {
    warehouseService.checkGoodsAvailability.mockImplementation(() => {
      throw new Error('Invalid goods data');
    });

    const req = { body: { goods: 'invalid-input' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    warehouseController.checkAvailability(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid goods data' });
  });

});