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
    expect(res.status).toHaveBeenCalledWith(200); // Expect status 200
    expect(res.json).toHaveBeenCalledWith({ message: 'Kit deleted successfully' }); // Expect success message
  });

  // Test 2: Handle non-existent kit
  it('Should return a 404 status and an error message when the kit does not exist', () => {
    // Mock the service to simulate kit not found
    kitService.deleteKitById.mockReturnValue(false);

    // Mock the req and res objects
    const req = { params: { id: 'non-existent-id' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Call the controller function
    kitController.deleteKit(req, res);

    // Assertions: Check if the status and json methods were called with the correct values
    expect(res.status).toHaveBeenCalledWith(404); // Expect status 404
    expect(res.json).toHaveBeenCalledWith({ error: 'Kit not found' }); // Expect error message
  });

});
