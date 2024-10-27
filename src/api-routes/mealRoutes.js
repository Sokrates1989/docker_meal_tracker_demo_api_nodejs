import express from "express";
import databaseWrapper from "../databaseWrapper.js";
import { config } from "../config.js";

const router = express.Router();

// Endpoint to get meal types
router.post("/getMealTypes", async (req, res) => {
    try {
        const { token } = req.body;

        if (token !== config.authentication_token) {
            res.status(401).json({ message: "Invalid token" });
            console.warn("/v1/getMealTypes: 401: Invalid token");
            return;
        }

        const mealTypes = await databaseWrapper.getMealTypeRepo().getAllMealTypes();
        if (!mealTypes) {
            res.status(500).json({ message: "Error fetching meal types" });
            console.error("/v1/getMealTypes: 500: Error fetching meal types");
            return;
        }

        res.status(200).json({ mealTypes });
        console.log("/v1/getMealTypes: 200: Successfully fetched meal types");
    } catch (error) {
        res.status(500).json({ message: "Unhandled exception" });
        console.error(`/v1/getMealTypes: 500: Unhandled exception: ${error.message}`);
    }
});

export default router;
