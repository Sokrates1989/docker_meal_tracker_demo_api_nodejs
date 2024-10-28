class UserRepo {
    constructor(db) {
        this.db = db;
    }

    /**
     * Checks if the provided userName and hashedPassword match a user in the database.
     * @param {Object} credentials - Contains userName and hashedPassword.
     * @returns {Promise<boolean>} - Returns true if credentials are correct, otherwise false.
     */
    async isUserPasswordCorrect({ userName, hashedPassword }) {
        try {
            const query = `SELECT COUNT(*) as count FROM users WHERE name = $1 AND hashedPassword = $2`;
            const result = await this.db.query(query, [userName, hashedPassword]);

            // Check if a user was found with the matching credentials
            return result.rows[0].count > 0;
        } catch (error) {
            console.error(`Error in isUserPasswordCorrect: ${error.message}`);
            throw error;
        }
    }

    /**
     * Retrieves a user based on userName and hashedPassword.
     * @param {Object} credentials - Contains userName and hashedPassword.
     * @returns {Promise<Object|null>} - Returns user data if found, otherwise null.
     */
    async getUserByCredentialsItem({ userName, hashedPassword }) {
        try {
            const query = `SELECT * FROM users WHERE name = $1 AND hashedPassword = $2`;
            const result = await this.db.query(query, [userName, hashedPassword]);

            // If a user is found, return the user data; otherwise, return null
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error(`Error in getUserByCredentialsItem: ${error.message}`);
            throw error;
        }
    }


    async createNewUser_fromCredentialsItem({ userName, hashedPassword }) {
        try {
            const existingUserQuery = `SELECT COUNT(*) as count FROM users WHERE name = $1`;
            const existingUserResult = await this.db.query(existingUserQuery, [userName]);

            if (existingUserResult.rows[0].count > 0) {
                // User already exists
                return null;
            }

            const insertUserQuery = `INSERT INTO users (name, hashedPassword) VALUES ($1, $2) RETURNING *`;
            const insertResult = await this.db.query(insertUserQuery, [userName, hashedPassword]);

            // Successfully created user
            return insertResult.rows[0];
        } catch (error) {
            console.error(`Error in createNewUser_fromCredentialsItem: ${error.message}`);
            throw error;
        }
    }
}

export default UserRepo;
