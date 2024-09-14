Warehouse and Orders API

Overview

This project provides an API for managing warehouse data, checking product availability, updating orders, and deleting kits. The focus of the project is on testing the core logic to ensure that controllers and services behave as expected. Jest's mocking capabilities are used to simulate data interactions without the need for a real database.

Technologies Used

Node.js: The runtime environment used to build and execute the API.
Jest: A testing framework used for unit tests, including mocking service functions to simulate interactions with data.
JavaScript (ES6): The primary language used for the project, leveraging features like destructuring and arrow functions.
Mocking with Jest: Jest's mocking capabilities were used to simulate service functions and their interactions.

API Endpoints

GET /api/v1/warehouses: Retrieves a list of all warehouses.
POST /api/v1/warehouses/check: Checks the availability of goods in the warehouse.
PUT /api/v1/orders/:id: Updates an existing order by ID.
DELETE /api/v1/kits/:id: Deletes a kit by its ID.

Installation Instructions

Clone the repository by running: git clone https://github.com/your-repo/project-name.git

Navigate to the project directory by running: cd project-name

Install the project dependencies by running: npm install

Setting the Test URL

Create a .env file in the root of the project.

Add the following line to set the test server URL: TEST_URL=http://localhost:3000

Running the Test Suite

Install dependencies by running: npm install

Run the tests by executing the following command: npm test

This will run tests for all the API endpoints, including GET, POST, PUT, and DELETE requests.