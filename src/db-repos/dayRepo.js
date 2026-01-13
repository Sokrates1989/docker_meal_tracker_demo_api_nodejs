// Copyright (C) 2024 Patrick Michiels
// All rights reserved.
// This source code is licensed under the Evaluation License Agreement and
// may not be used, modified, or distributed without explicit permission from the author.
// This code is provided for evaluation purposes only.

/**
 * @class DayRepo
 * @description Repository class for handling day-related database operations.
 * @param {Object} db - Database client instance for executing queries.
 */
class DayRepo {
    constructor(db) {
        this.db = db;
    }

    /**
     * Retrieves a specific day record by year, month, and day.
     * @param {number} year - The year of the day to retrieve.
     * @param {number} month - The month of the day to retrieve.
     * @param {number} day - The day of the month to retrieve.
     * @returns {Object|null} The day record if found, or null if not found.
     * @throws Throws an error if the query fails.
     */
    async getDayByDate(year, month, day) {
        try {
            const query = `SELECT * FROM days WHERE year = $1 AND month = $2 AND day = $3`;
            const result = await this.db.query(query, [year, month, day]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error("Error fetching day by date:", error);
            throw error;
        }
    }

    /**
     * Inserts a new day record with specified year, month, and day values.
     * @param {number} year - The year for the new day entry.
     * @param {number} month - The month for the new day entry.
     * @param {number} day - The day of the month for the new day entry.
     * @returns {Object} The newly created day record.
     * @throws Throws an error if the query fails.
     */
    async createNewDay(year, month, day) {
        try {
            const query = `INSERT INTO days (year, month, day) VALUES ($1, $2, $3) RETURNING *`;
            const result = await this.db.query(query, [year, month, day]);
            return result.rows[0];
        } catch (error) {
            console.error("Error creating new day:", error);
            throw error;
        }
    }
}

export default DayRepo;
