const kitService = require('../services/kitService'); // Import the service
const kitController = require('../controllers/kitController'); // Import the controller

// Mock the kit service
jest.mock('../services/kitService');

describe('DELETE /api/v1/kits/:id', () => {

  // Test 1: Successfully delete a kit
  it('Should return a 200 status and a success message when the kit is deleted', () => {
    // Mock the service to simulate successful deletion
    kitService.deleteKitById.mockReturnValue(true);

    // Mock the req and res objects
    const req = { params: { id: '12345' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    kitController.deleteKit(req, res);

    // Assertions: Check if the status and json methods were called with the correct values
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Kit deleted successfully' });
  });

  // Test 2: Handle invalid ID format and return a 400 error
  it('Should return a 400 status when the ID format is invalid', () => {
    kitService.deleteKitById.mockImplementation(() => {
      throw new Error('Invalid ID format');
    });

    const req = { params: { id: 'invalid-format' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    kitController.deleteKit(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid ID format' });
  });

});
