const orderService = require('../services/orderService'); // Import the order service

// Controller function to handle PUT /api/v1/orders/:id
const updateOrder = (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = req.body;

    // Validate order data
    if (!orderData.product || !orderData.quantity) {
      return res.status(400).json({ error: 'Missing order data' });
    }

    const updatedOrder = orderService.updateOrderById(orderId, orderData);
    res.status(200).json(updatedOrder); // Send response with updated order
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order' });
  }
};

// Export the updateOrder function
module.exports = {
  updateOrder,
};