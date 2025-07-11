# Client Management System

A full-stack client management application built with Node.js, Express, MongoDB, and vanilla JavaScript. This system allows users to manage client information with CRUD (Create, Read, Update, Delete) operations through a simple web interface.

## Features

- **Client Management**: Add, edit, view, and delete client records
- **MongoDB Integration**: Persistent storage using MongoDB database
- **Responsive UI**: Clean, user-friendly interface built with HTML/CSS/JavaScript
- **RESTful API**: Full CRUD operations via REST endpoints

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose ODM
  - Body-parser for request handling
  - CORS for cross-origin requests

- **Frontend**:
  - HTML5
  - CSS3
  - Vanilla JavaScript (ES6+)

- **Testing**:
  - Node.js fetch implementation for API testing

## Project Structure

```
clientelocal/
├── models/              # MongoDB models
│   └── Client.js        # Client data model
├── index.html           # Main web interface
├── app.js               # Frontend JavaScript logic
├── server.js            # Express server and API endpoints
├── test_client_add.js   # Test script for client addition
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/clientelocal.git
   cd clientelocal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB service (if running locally):
   ```bash
   mongod
   ```

4. Start the application:
   ```bash
   node server.js
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Web Interface

1. **View Clients**: Click "Load Clients" to fetch and display all client records
2. **Add Client**: Fill out the form at the bottom of the page and click "Save Client"
3. **Edit Client**: Click "Edit" next to a client, modify the form fields, and click "Update Client"
4. **Delete Client**: Click "Delete" next to a client to remove it from the database

### API Endpoints

The application provides the following RESTful endpoints:

- **GET /clients**: Retrieve all clients
- **POST /clients**: Add a new client (requires JSON body with name, address, email)
- **GET /clients/:id**: Retrieve a single client by ID
- **PATCH /clients/:id**: Update an existing client (requires JSON body with fields to update)
- **DELETE /clients/:id**: Delete a client by ID

## Testing

A test script is included to verify client addition functionality:

```bash
node test_client_add.js
```

This script:
1. Fetches existing clients
2. Adds a new test client
3. Verifies the client was added successfully

## Database

The application uses MongoDB to store client information. The `Client` model includes:

- `name`: String (required)
- `address`: String (required)
- `email`: String (required, unique)

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License. See the LICENSE file for details.