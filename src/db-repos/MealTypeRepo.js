// Copyright (C) 2024 Patrick Michiels
// All rights reserved.
// This source code is licensed under the Evaluation License Agreement and
// may not be used, modified, or distributed without explicit permission from the author.
// This code is provided for evaluation purposes only.

/**
 * @class MealTypeRepo
 * @description Repository class for handling meal type-related database operations.
 */
class MealTypeRepo {
    /**
     * @constructor
     * @param {Object} db - Database client instance for executing queries.
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * @method getAllMealTypes
     * @description Retrieves all meal types from the database.
     * @returns {Array} Array of all meal type records.
     * @throws Throws an error if the query fails.
     */
    async getAllMealTypes() {
        try {
            const result = await this.db.query("SELECT * FROM meal_types");
            return result.rows;
        } catch (error) {
            console.error("Error fetching meal types:", error);
            throw error;
        }
    }

    /**
     * @method getMealTypeIDByName
     * @description Retrieves the ID of a meal type based on its name.
     * @param {string} mealTypeName - The name of the meal type.
     * @returns {number|null} The ID of the meal type if found, or null if not found.
     * @throws Throws an error if the query fails.
     */
    async getMealTypeIDByName(mealTypeName) {
        try {
            const query = "SELECT ID FROM meal_types WHERE name = $1";
            const result = await this.db.query(query, [mealTypeName]);

            // Return the ID if found, otherwise null
            return result.rows.length > 0 ? result.rows[0].id : null;
        } catch (error) {
            console.error(`Error fetching meal type ID for ${mealTypeName}:`, error);
            throw error;
        }
    }

    /**
     * @method getMealTypeNameByID
     * @description Retrieves the name of a meal type based on its ID.
     * @param {number} mealTypeID - The ID of the meal type.
     * @returns {string|null} The name of the meal type if found, or null if not found.
     * @throws Throws an error if the query fails.
     */
    async getMealTypeNameByID(mealTypeID) {
        try {
            const query = "SELECT name FROM meal_types WHERE ID = $1";
            const result = await this.db.query(query, [mealTypeID]);

            // Return the name if found, otherwise null
            return result.rows.length > 0 ? result.rows[0].name : null;
        } catch (error) {
            console.error(`Error fetching meal type name for ID ${mealTypeID}:`, error);
            throw error;
        }
    }
}

export default MealTypeRepo;
