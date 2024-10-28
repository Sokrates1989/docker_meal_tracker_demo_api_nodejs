class DayRepo {
    constructor(db) {
        this.db = db;
    }

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
