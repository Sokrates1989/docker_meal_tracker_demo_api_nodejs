class DayMealRepo {
    constructor(db) {
        this.db = db;
    }

    async createNewDayMeal(userId, dayId, mealTypeId, mealId) {
        try {
            const query = `INSERT INTO day_meals (fk_user_id, fk_day_id, fk_meal_type_id, fk_meal_id) VALUES ($1, $2, $3, $4) RETURNING *`;
            const result = await this.db.query(query, [userId, dayId, mealTypeId, mealId]);
            return result.rows[0];
        } catch (error) {
            // Check if the error is a duplicate key violation
            if (error.code === '23505') { // PostgreSQL duplicate key error code
                console.warn(`Duplicate entry for userId: ${userId}, dayId: ${dayId}, mealTypeId: ${mealTypeId}`);
                return null;
            } else {
                console.error("Error creating new day meal entry:", error);
                throw error;
            }
        }
    }
    async getDayMeal(userId, dayId, mealTypeId) {
        try {
            const query = `SELECT * FROM day_meals WHERE fk_user_id = $1 AND fk_day_id = $2 AND fk_meal_type_id = $3`;
            const result = await this.db.query(query, [userId, dayId, mealTypeId]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error("Error fetching day meal:", error);
            throw error;
        }
    }

    async getDayMealsByUserIDAndDayID(userId, dayId) {
        try {
            const query = `SELECT * FROM day_meals WHERE fk_user_id = $1 AND fk_day_id = $2`;
            const result = await this.db.query(query, [userId, dayId]);
            return result.rows;
        } catch (error) {
            console.error("Error fetching day meals by user ID and day ID:", error);
            throw error;
        }
    }
}

export default DayMealRepo;
