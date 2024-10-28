class MealTypeRepo {
    constructor(db) {
        this.db = db;
    }

    async getAllMealTypes() {
        try {
            const result = await this.db.query("SELECT * FROM meal_types");
            return result.rows;
        } catch (error) {
            console.error("Error fetching meal types:", error);
            throw error;
        }
    }

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
