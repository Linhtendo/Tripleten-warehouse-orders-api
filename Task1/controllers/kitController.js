// controllers/kitController.js

const kitService = require('../services/kitService');

// Controller function to handle DELETE /api/v1/kits/:id
const deleteKit = (req, res) => {
  try {
    const kitId = req.params.id;
    const success = kitService.deleteKitById(kitId);
    if (success) {
      res.status(200).json({ message: 'Kit deleted successfully' });
    } else {
      res.status(404).json({ error: 'Kit not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the kit' });
  }
};

module.exports = {
  deleteKit // Export the deleteKit controller function
};
