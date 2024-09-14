const orderService = require('../services/orderService'); // Import the service
const orderController = require('../controllers/orderController'); // Import the controller

// Mock the order service
jest.mock('../services/orderService');

describe('PUT /api/v1/orders/:id', () => {

  // Test 1: Check the response status code and updated order data
  it('Should return a 200 status code and the updated order', () => {
    // Mock the input order data and the expected service response
    const orderId = '12345';
    const mockOrderData = { product: 'Bananas', quantity: 10 };
    const mockUpdatedOrder = { id: orderId, ...mockOrderData };

    // Mock the service to return the expected updated order
    orderService.updateOrderById.mockReturnValue(mockUpdatedOrder);

    // Mock the req and res objects
    const req = { params: { id: orderId }, body: mockOrderData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    orderController.updateOrder(req, res);

    // Assertions for status code and response structure
    expect(res.status).toHaveBeenCalledWith(200); // Expect status 200
    expect(res.json).toHaveBeenCalledWith(mockUpdatedOrder); // Expect the updated order data

    // Check the response body structure
    const responseData = res.json.mock.calls[0][0]; // Get the response data
    expect(responseData).toHaveProperty('id', orderId); // Check order ID
    expect(responseData).toHaveProperty('product', 'Bananas'); // Check product
    expect(responseData).toHaveProperty('quantity', 10); // Check quantity
  });

  // Test 2: Handle invalid order ID and check for a 500 error
  it('Should return a 500 status code if there is an error updating the order', () => {
    // Simulate an error in the service
    orderService.updateOrderById.mockImplementation(() => {
      throw new Error('Order not found');
    });

    // Mock the req and res objects
    const req = { params: { id: 'invalid-id' }, body: { product: 'Bananas', quantity: 10 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    orderController.updateOrder(req, res);

    // Assertions for status code and error message
    expect(res.status).toHaveBeenCalledWith(500); // Expect status 500
    expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while updating the order' });
  });

});
