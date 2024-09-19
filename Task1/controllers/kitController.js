const kitService = require('../services/kitService'); // Import the kit service

// Controller function to handle DELETE /api/v1/kits/:id
const deleteKit = (req, res) => {
  try {
    const id = req.params.id;

    // Validate the ID format
    if (!isValidId(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const result = kitService.deleteKitById(id);
    if (!result) {
      return res.status(404).json({ error: 'Kit not found' });
    }

    return res.status(200).json({ message: 'Kit deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while deleting the kit' });
  }
};

// Helper function to validate ID format
const isValidId = (id) => /^[a-zA-Z0-9]+$/.test(id);

// Export the deleteKit function
module.exports = {
  deleteKit,
};