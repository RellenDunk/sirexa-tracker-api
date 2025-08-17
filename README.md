# Sirexa Tracker API

## Overview
Sirexa Tracker API is a Node.js application built with TypeScript that provides a RESTful API for tracking various entities. It uses PostgreSQL as the database to store and manage tracker data.

## Features
- Create and manage trackers
- Retrieve tracker information
- Built with TypeScript for type safety
- Uses Express.js for handling HTTP requests

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sirexa-tracker-api.git
   ```
2. Navigate to the project directory:
   ```
   cd sirexa-tracker-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory and add your PostgreSQL connection details:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/database_name
   ```

### Running the Application
To start the application, run:
```
npm run start
```

### API Endpoints
- `GET /trackers`: Retrieve all trackers
- `POST /trackers`: Create a new tracker

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.