const orderService = require('../services/orderService'); // Import the order service

// Controller function to handle PUT /api/v1/orders/:id
const updateOrder = (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = orderService.updateOrderById(orderId, req.body);
    res.status(200).json(updatedOrder); // Send response with updated order
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order' });
  }
};

module.exports = {
  updateOrder // Export the updateOrder controller function
};
