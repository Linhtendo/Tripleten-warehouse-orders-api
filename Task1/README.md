Warehouse and Orders API

Description

The Warehouse and Orders API is a backend service designed to manage warehouse data, check product availability, update orders, and delete kits. The project focuses on ensuring robust functionality through thorough testing of the core logic, including controllers and services. This API uses Jest for testing, leveraging mocking capabilities to simulate data interactions, making the testing process efficient and independent of a real database.

Technologies and Techniques Used

Node.js: The JavaScript runtime environment used to build the API.

Jest: A powerful testing framework used to write and execute unit tests. Jest’s mocking capabilities are extensively used to 
simulate service functions and validate the interactions between controllers and services.

JavaScript (ES6): The primary language used for the project, utilizing modern JavaScript features like destructuring, arrow functions, and async/await for cleaner and more efficient code.

Mocking with Jest: Jest’s built-in mocking functionality is used to create mocks for service functions, allowing isolated testing of controllers without requiring actual database operations.

Running the Tests:

Follow these steps to run the tests for the API:

Ensure Dependencies are Installed: Before running the tests, make sure all dependencies are installed. If not already done, you can install them by running:

npm install

Running the Test Suite: Execute the test suite using the following command:

npm test

This command will run all tests defined for the API endpoints, including GET, POST, PUT, and DELETE requests. The tests ensure that the API's core functionality works as expected by validating the responses and behaviors of various endpoints.