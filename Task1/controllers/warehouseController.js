// controllers/warehousesController.js

const warehouseService = require('../services/warehouseService'); // Import once

// Controller function to handle GET /api/v1/warehouses
const getWarehouses = (req, res) => {
  try {
    const warehouses = warehouseService.getAllWarehouses();
    res.status(200).json(warehouses); // Send response with 200 status
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' }); // Handle error
  }
};

// Controller function to handle POST /api/v1/warehouses/check
const checkAvailability = (req, res) => {
  try {
    const availability = warehouseService.checkGoodsAvailability(req.body.goods);
    res.status(200).json(availability); // Send response with 200 status
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking availability' });
  }
};

// Export both controller functions
module.exports = {
  getWarehouses,
  checkAvailability
};
