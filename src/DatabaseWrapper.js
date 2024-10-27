// Global/ public imports.
import pg from "pg";

// Own module imports.
import { config } from "./config.js";

// DB Repo imports.
import MealTypeRepo from "./db-repos/MealTypeRepo.js";

class DatabaseWrapper {
    constructor() {
        // Establish the database connection.
        this.db = new pg.Client({
            user: config.db_user,
            host: config.db_host,
            database: config.db_database,
            password: config.db_password,
            port: config.db_port,
        });
        this.db.connect()
            .then(() => console.log("Connected to the database."))
            .catch((error) => console.error("Database connection error:", error));
    }

    // Initialize and return an instance of the MealTypeRepo
    getMealTypeRepo() {
        return new MealTypeRepo(this.db);
    }

    // Close the database connection
    close() {
        this.db.end()
            .then(() => console.log("Database connection closed."))
            .catch((error) => console.error("Error closing database connection:", error));
    }
}

// Export an instance of DatabaseWrapper to be used in other modules.
export default new DatabaseWrapper();