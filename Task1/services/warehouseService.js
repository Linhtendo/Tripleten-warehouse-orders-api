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
  
  // Export both functions
  module.exports = {
    getAllWarehouses,
    checkGoodsAvailability
  };
  