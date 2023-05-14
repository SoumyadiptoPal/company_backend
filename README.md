# Company Backend

This is the backend part of a company management web application. The application is built using Node.js and connects to a MongoDB database.

## Installation

To run this application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/SoumyadiptoPal/company_backend.git`
2. Change into the directory: `cd company_backend`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

The application should now be running on `http://localhost:5000`.

## Usage

The application provides a REST API for managing a company's employees, departments, and projects. The API can be accessed using HTTP requests, and responses are returned in JSON format. The following endpoints are available:

- `GET /api/getUser`: Get a list of all employees
- `POST /api/addUser`: Create a new employee
- `PUT /api/editUser/:id`: Update information about a specific employee
- `DELETE /api/deleteUser/:id`: Delete a specific employee


## Contributing

Contributions are welcome! If you have any bug reports, feature requests, or pull requests, please submit them through the [GitHub repository](https://github.com/SoumyadiptoPal/company_backend).
