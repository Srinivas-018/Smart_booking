# bookyourshow-monorepo

## Overview
The **bookyourshow-monorepo** is a full-stack application that allows users to browse and book movie tickets. This monorepo contains both the backend and frontend applications, structured to facilitate development and deployment.

## Project Structure
```
bookyourshow-monorepo
├── backend          # Backend application
│   ├── src         # Source code for the backend
│   ├── package.json # Backend dependencies and scripts
│   ├── .env        # Environment variables for the backend
│   └── README.md   # Documentation for the backend
├── frontend         # Frontend application
│   ├── src         # Source code for the frontend
│   ├── package.json # Frontend dependencies and scripts
│   └── README.md   # Documentation for the frontend
├── package.json     # Monorepo configuration
└── README.md        # Documentation for the entire monorepo
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- SQLite (for the backend)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd bookyourshow-monorepo
   ```

2. Install dependencies for both backend and frontend:
   - For the backend:
     ```
     cd backend
     npm install
     ```

   - For the frontend:
     ```
     cd ../frontend
     npm install
     ```

### Environment Variables
Create a `.env` file in the `backend` directory and add the necessary environment variables, such as database connection strings and API keys.

### Running the Application
- To start the backend server:
  ```
  cd backend
  npm start
  ```

- To start the frontend application:
  ```
  cd frontend
  npm start
  ```

### Usage
- Access the frontend application at `http://localhost:3000`.
- The backend API will be available at `http://localhost:5000/api`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.