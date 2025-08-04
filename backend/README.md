# Backend README.md

# Book Your Show Backend

This is the backend service for the Book Your Show application. It provides the necessary APIs to support the frontend application.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)
- SQLite (for development database)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/bookyourshow-monorepo.git
   ```

2. Navigate to the backend directory:

   ```
   cd bookyourshow-monorepo/backend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend directory and add the following variables:

```
DATABASE_URL=sqlite:dev.db
PORT=5000
```

### Running the Application

To start the backend server, run:

```
npm start
```

The server will be running on `http://localhost:5000`.

### API Endpoints

- **GET /api/movies**: Retrieve a list of movies.
- **GET /api/shows/:movieId**: Retrieve showtimes for a specific movie.
- **POST /api/bookings**: Create a new booking.

### Testing

To run tests, use:

```
npm test
```

## Folder Structure

- `src/controllers`: Contains the business logic for different routes.
- `src/models`: Defines the data structure and interacts with the database.
- `src/routes`: Defines the API endpoints and links them to the appropriate controllers.
- `src/services`: Encapsulates business logic and interacts with the models.

## License

This project is licensed under the MIT License. See the LICENSE file for details.