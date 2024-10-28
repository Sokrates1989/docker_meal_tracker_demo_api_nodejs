import express from "express";
import databaseWrapper from "../databaseWrapper.js";

const router = express.Router();

// Retrieve repositories from the database wrapper
const userRepo = databaseWrapper.getUserRepo();
const dayRepo = databaseWrapper.getDayRepo();
const mealRepo = databaseWrapper.getMealRepo();
const mealTypeRepo = databaseWrapper.getMealTypeRepo();
const dayMealRepo = databaseWrapper.getDayMealRepo();

// Endpoint to get meal types.
router.post("/getMealTypes", async (req, res) => {
    try {

        const mealTypes = await mealTypeRepo.getAllMealTypes();
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


// Add Meal Route
router.post('/addMeal', async (req, res) => {
    try {
        const meal = req.body;

        // Fetch or create the user.
        const user = await userRepo.getUserByCredentialsItem(meal.credentials);
        if (!user) {
            res.status(406).json({ message: 'user does not exist' });
            console.warn(`/v1/addMeal: 406: user does not exist: ${JSON.stringify(meal.credentials)}`);
            return;
        }

        const userId = user.id;

        // Fetch or create the day.
        let day = await dayRepo.getDayByDate(meal.year, meal.month, meal.day);
        if (!day) {
            day = await dayRepo.createNewDay(meal.year, meal.month, meal.day);
        }
        const dayId = day.id;

        // Get meal type ID.
        const mealTypeId = await mealTypeRepo.getMealTypeIDByName(meal.mealType.toLowerCase());
        if (!mealTypeId) {
            res.status(400).json({ message: 'invalid meal type' });
            console.warn(`/v1/addMeal: 400: invalid meal type: ${meal.mealType}`);
            return;
        }

        // Create new meal entry.
        const newMeal = await mealRepo.createNewMeal(meal.fat_level, meal.sugar_level);
        if (!newMeal) {
            res.status(400).json({ message: 'Meal already exists. To edit meal use /v1/editMeal' });
            console.warn(`/v1/addMeal: 400: could not create day meal`);
            return;
        }
        const mealId = newMeal.id;

        // Insert the new day meal entry.
        const dayMeal = await dayMealRepo.createNewDayMeal(userId, dayId, mealTypeId, mealId);

        // Check if the day meal could not be created due to a duplicate entry.
        if (dayMeal === null) {
            res.status(400).json({ message: "Meal already exists. To edit meal use /v1/editMeal" });
            return;
        }

        res.status(200).json({ message: 'successfully added meal' });

    } catch (error) {
        console.error("Error in addMeal route:", error);
        res.status(500).json({ message: "internal server error" });
    }
});


// Edit Meal Route
router.post('/editMeal', async (req, res) => {
    const meal = req.body;

    const user = await userRepo.getUserByCredentialsItem(meal.credentials);
    if (!user) {
        res.status(406).json({ message: 'user does not exist' });
        return;
    }

    const userId = user.id;
    const day = await dayRepo.getDayByDate(meal.year, meal.month, meal.day);
    if (!day) {
        res.status(404).json({ message: 'day not found' });
        return;
    }

    const mealTypeId = await mealTypeRepo.getMealTypeIDByName(meal.mealType.toLowerCase());
    if (!mealTypeId) {
        res.status(400).json({ message: 'invalid meal type' });
        return;
    }

    const existingDayMeal = await dayMealRepo.getDayMeal(userId, day.id, mealTypeId);
    if (!existingDayMeal) {
        res.status(404).json({ message: 'meal not found for the specified day' });
        return;
    }

    const updateResult = await mealRepo.updateMeal(existingDayMeal.fk_meal_id, meal.fat_level, meal.sugar_level);
    res.status(updateResult ? 200 : 500).json({ message: updateResult ? 'successfully edited meal' : 'failed to update meal' });
});

// Delete Meal Route
router.post('/deleteMeal', async (req, res) => {
    const deleteMeal = req.body;

    const user = await userRepo.getUserByCredentialsItem(deleteMeal.credentials);
    if (!user) {
        res.status(406).json({ message: 'user does not exist' });
        return;
    }

    const userId = user.id;
    const day = await dayRepo.getDayByDate(deleteMeal.year, deleteMeal.month, deleteMeal.day);
    if (!day) {
        res.status(404).json({ message: 'day not found' });
        return;
    }

    const mealTypeId = await mealTypeRepo.getMealTypeIDByName(deleteMeal.mealType.toLowerCase());
    if (!mealTypeId) {
        res.status(400).json({ message: 'invalid meal type' });
        return;
    }

    const existingDayMeal = await dayMealRepo.getDayMeal(userId, day.id, mealTypeId);
    if (!existingDayMeal) {
        res.status(404).json({ message: 'meal not found for the specified day' });
        return;
    }

    const deleteResult = await mealRepo.deleteMeal(userId, day.id, mealTypeId, existingDayMeal.fk_meal_id);
    res.status(deleteResult ? 200 : 404).json({ message: deleteResult ? 'successfully deleted meal' : 'meal or day_meal entry not found' });
});

// Get Meals Route
router.post('/getMeals', async (req, res) => {
    const getMeals = req.body;

    const user = await userRepo.getUserByCredentialsItem(getMeals.credentials);
    if (!user) {
        res.status(406).json({ message: 'user does not exist' });
        return;
    }

    const userId = user.id;
    const day = await dayRepo.getDayByDate(getMeals.year, getMeals.month, getMeals.day);
    if (!day) {
        res.status(200).json({ meals: [] });
        return;
    }

    const dayMeals = await dayMealRepo.getDayMealsByUserIDAndDayID(userId, day.id);
    const mealList = [];

    for (const dayMeal of dayMeals) {
        const mealTypeName = await mealTypeRepo.getMealTypeNameByID(dayMeal.fk_meal_type_id);
        const meal = await mealRepo.getMealByID(dayMeal.fk_meal_id);

        if (mealTypeName && meal) {
            mealList.push({
                year: getMeals.year,
                month: getMeals.month,
                day: getMeals.day,
                mealType: mealTypeName,
                fat_level: meal.fat_level,
                sugar_level: meal.sugar_level,
            });
        }
    }

    res.status(200).json({ meals: mealList });
});

export default router;
