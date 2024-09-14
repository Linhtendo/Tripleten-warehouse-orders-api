// services/warehouseService.js

// Function to return a list of warehouses
const getAllWarehouses = () => {
  return [
    { id: 1, name: 'Warehouse 1', location: 'Location 1' },
    { id: 2, name: 'Warehouse 2', location: 'Location 2' }
  ];
};

// Function to check goods availability
const checkGoodsAvailability = (goods) => {
  return goods.map(good => ({
    name: good.name,
    available: good.quantity <= 100 // Available if quantity is <= 100
  }));
};

// Function to update an order by ID
const updateOrderById = (id, orderData) => {
  // Simulate updating the order in the database
  const updatedOrder = {
    id,
    ...orderData // Update the order with the provided data
  };

  // Return the updated order
  return updatedOrder;
};

// Export all functions
module.exports = {
  getAllWarehouses,
  checkGoodsAvailability,
  updateOrderById
};
