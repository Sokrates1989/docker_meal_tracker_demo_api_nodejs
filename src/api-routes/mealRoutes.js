import express from "express";
import databaseWrapper from "../databaseWrapper.js";

const router = express.Router();

// Endpoint to get meal types.
router.post("/getMealTypes", async (req, res) => {
    try {

        const mealTypes = await databaseWrapper.getMealTypeRepo().getAllMealTypes();
        if (!mealTypes) {
            res.status(500).json({ message: "Error fetching meal types" });
            console.error("/getMealTypes: 500: Error fetching meal types");
            return;
        }

        res.status(200).json({ mealTypes });
        console.log("/getMealTypes: 200: Successfully fetched meal types");
    } catch (error) {
        res.status(500).json({ message: "Unhandled exception" });
        console.error(`/getMealTypes: 500: Unhandled exception: ${error.message}`);
    }
});

export default router;
