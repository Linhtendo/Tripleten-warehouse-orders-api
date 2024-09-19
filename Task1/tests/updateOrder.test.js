const orderService = require('../services/orderService');
const orderController = require('../controllers/orderController');

jest.mock('../services/orderService');

describe('PUT /api/v1/orders/:id', () => {

  // Test 1: Check the response status code and updated order data
  it('Should return a 200 status code and the updated order', () => {
    const orderId = '12345';
    const mockOrderData = { product: 'Bananas', quantity: 10 };
    const mockUpdatedOrder = { id: orderId, ...mockOrderData };

    orderService.updateOrderById.mockReturnValue(mockUpdatedOrder);

    const req = { params: { id: orderId }, body: mockOrderData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    orderController.updateOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedOrder);

    const responseData = res.json.mock.calls[0][0];
    expect(responseData).toHaveProperty('id', orderId);
    expect(responseData).toHaveProperty('product', 'Bananas');
    expect(responseData).toHaveProperty('quantity', 10);
  });

  // Test 2: Handle invalid order ID and check for a 500 error
  it('Should return a 500 status code if there is an error updating the order', () => {
    orderService.updateOrderById.mockImplementation(() => {
      throw new Error('Order not found');
    });

    const req = { params: { id: 'invalid-id' }, body: { product: 'Bananas', quantity: 10 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    orderController.updateOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while updating the order' });
  });

  // Test 3: Handle missing order data and return a 400 error
  it('Should return a 400 status code if required order data is missing', () => {
    orderService.updateOrderById.mockImplementation(() => {
      throw new Error('Missing order data');
    });

    const req = { params: { id: '12345' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    orderController.updateOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing order data' });
  });

});
