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
}

export default MealTypeRepo;
