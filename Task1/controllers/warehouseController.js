const warehouseService = require('../services/warehouseService'); // Import warehouse service
const orderService = require('../services/orderService'); // Import order service for handling PUT requests

// Controller function to handle GET /api/v1/warehouses
const getWarehouses = (req, res) => {
  try {
    const warehouses = warehouseService.getAllWarehouses();
    res.status(200).json(warehouses); // Send response with 200 status
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving warehouses' }); // Handle error with specific message
  }
};

// Controller function to handle POST /api/v1/warehouses/check
const checkAvailability = (req, res) => {
  try {
    const { goods } = req.body;

    // Validate input: Ensure goods is an array and not empty
    if (!Array.isArray(goods) || goods.length === 0) {
      return res.status(400).json({ error: 'Invalid goods data' });
    }

    const availability = warehouseService.checkGoodsAvailability(goods);
    res.status(200).json(availability); // Send response with 200 status
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking availability' });
  }
};

// Controller function to handle PUT /api/v1/orders/:id
const updateOrder = (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;

    // Validate input: Ensure required fields are present
    if (!orderData.product || !orderData.quantity) {
      return res.status(400).json({ error: 'Missing order data' });
    }

    const updatedOrder = orderService.updateOrderById(orderId, orderData);
    res.status(200).json(updatedOrder); // Send response with updated order
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order' });
  }
};

// Export all controller functions
module.exports = {
  getWarehouses,
  checkAvailability,
  updateOrder // Export updateOrder function
};