class MealRepo {
    constructor(db) {
        this.db = db;
    }

    async createNewMeal(fat_level, sugar_level) {
        try {
            const query = `INSERT INTO meals (fat_level, sugar_level) VALUES ($1, $2) RETURNING *`;
            const result = await this.db.query(query, [fat_level, sugar_level]);
            return result.rows[0];
        } catch (error) {
            console.error("Error creating new meal:", error);
            throw error;
        }
    }

    async getMealByID(mealId) {
        try {
            const query = `SELECT * FROM meals WHERE id = $1`;
            const result = await this.db.query(query, [mealId]);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error("Error fetching meal by ID:", error);
            throw error;
        }
    }

    async updateMeal(mealId, fat_level, sugar_level) {
        try {
            const query = `UPDATE meals SET fat_level = $1, sugar_level = $2 WHERE id = $3 RETURNING *`;
            const result = await this.db.query(query, [fat_level, sugar_level, mealId]);
            return result.rows.length > 0;
        } catch (error) {
            console.error("Error updating meal:", error);
            throw error;
        }
    }

    async deleteMeal(userId, dayId, mealTypeId, mealId) {
        try {
            const query = `DELETE FROM meals WHERE id = $1 RETURNING *`;
            const result = await this.db.query(query, [mealId]);
            return result.rows.length > 0;
        } catch (error) {
            console.error("Error deleting meal:", error);
            throw error;
        }
    }
}

export default MealRepo;
