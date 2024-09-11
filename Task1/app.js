// app.js

const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Example GET endpoint for warehouses
app.get('/api/v1/warehouses', (req, res) => {
  const warehouses = [
    { id: 1, name: 'Warehouse 1', location: 'Location 1' },
    { id: 2, name: 'Warehouse 2', location: 'Location 2' },
  ];
  res.status(200).json(warehouses); // Send the list of warehouses
});

module.exports = app;
