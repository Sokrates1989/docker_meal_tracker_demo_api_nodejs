# docker_meal_tracker_demo_api_nodejs

A demo API showcasing backend skills with NodeJS, Express, and PostgreSQL for meal tracking. This API supports user authentication, meal management (add, edit, delete), and containerized deployment via Docker. Designed for both local development and production environments. **Note**: Not intended for real-world use.

## Table of Contents
- [Features](#features)
- [Endpoints](#endpoints)
  - [User Authentication](#user-authentication)
  - [Meal Management](#meal-management)
- [Installation](#installation)
- [Usage](#usage)
- [Technical Details](#technical-details)
- [Notes](#notes)
- [Documentation Generation](#documentation-generation)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration endpoints.
- **Meal Management**: Routes for adding, editing, deleting, and retrieving meal entries.
- **Containerized Deployment**: Easily deployable via Docker for consistent environments.

## Endpoints

### User Authentication
1. **Register User**
   - **POST /register**
   - Registers a new user if the username does not already exist.
   - **Response**: User details if successful, or an error message if the user already exists.

2. **Login User**
   - **POST /login**
   - Authenticates a user based on provided credentials.
   - **Response**: User details if successful, or an error message if credentials are incorrect.

### Meal Management
1. **Get Meal Types**
   - **POST /getMealTypes**
   - Retrieves all available meal types.
   - **Response**: Array of meal types.

2. **Add Meal**
   - **POST /addMeal**
   - Adds a new meal entry for a user on a specified day, based on provided fat and sugar levels.
   - **Response**: Success message or error if the meal already exists.

3. **Edit Meal**
   - **POST /editMeal**
   - Updates an existing meal’s details (fat and sugar levels) for a specified day.
   - **Response**: Success message or an error if the meal cannot be updated.

4. **Delete Meal**
   - **POST /deleteMeal**
   - Deletes an existing meal entry for a user on a specified day.
   - **Response**: Success message or an error if the meal does not exist.

5. **Get Meals**
   - **POST /getMeals**
   - Retrieves all meal entries for a user on a specified day.
   - **Response**: Array of meal entries or an empty array if no meals are found.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/docker_meal_tracker_demo_api_nodejs.git
   ```
2. Set up environment variables in a `.env` file (refer to `config.js` for required variables).

3. Build and run with Docker:
   ```bash
   docker-compose up --build
   ```

## Usage

- Access the API endpoints via `localhost:3000` (or the specified port in the `.env` file).
- Each endpoint requires specific parameters; refer to the endpoint details above.

## Technical Details

- **Language**: JavaScript (Node.js)
- **Framework**: Express
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Libraries**: body-parser, dotenv

## Notes

- This project demonstrates backend skills with Node.js, Express, and PostgreSQL.
- It includes comprehensive logging and error handling.
- **For demonstration purposes only.** Not intended for production use.

---

## Documentation Generation

To generate the documentation from the JSDoc comments, follow these steps:

1. **Install JSDoc**:
   ```bash
   npm install jsdoc --save-dev
   ```

2. **Create a Configuration File** (if not already present):
   Create a `jsdoc.json` file in the project root with the following content:
   ```json
   {
     "source": {
       "include": ["src"],
       "includePattern": ".js$",
       "excludePattern": "(node_modules/|docs)"
     },
     "opts": {
       "destination": "./docs",
       "recurse": true,
       "template": "node_modules/jsdoc/templates/default"
     }
   }
   ```

3. **Generate Documentation**:
   Run the following command to generate documentation based on the JSDoc comments:
   ```bash
   npx jsdoc -c jsdoc.json
   ```

4. **View the Documentation**:
   Open the generated `docs/index.html` file in your browser to view the documentation.

## License

This software is provided under an **Evaluation License Agreement**. It may only be used for evaluation purposes and cannot be modified, copied, or distributed without the express permission of the author.

For full details, please refer to the [LICENSE](./LICENSE) file.
