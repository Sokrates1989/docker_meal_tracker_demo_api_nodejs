// Global/ public imports.
import express from "express";
import bodyParser from "body-parser";

// Own module imports.
import { config } from "./src/config.js";
import databaseWrapper from "./src/DatabaseWrapper.js";

// Base var initialzitions.
const app = express();
const port = config.api_port;

// Middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



  
// Endpoints.
app.get("/", (req, res) => {
    res.send(`<a href="https://github.com/Sokrates1989/docker_meal_tracker_demo_api_nodejs">GitHub Repository - Docker Meal Tracker Demo API (NodeJS)</a>`);
});

app.post("/", (req, res) => {
    res.send(`<a href="https://github.com/Sokrates1989/docker_meal_tracker_demo_api_nodejs">GitHub Repository - Docker Meal Tracker Demo API (NodeJS)</a>`);
});


// Endpoint to get meal types.
app.post("/v1/getMealTypes", async (req, res) => {
    try {
        // Validate token
        const { token } = req.body;
        
        console.log(`config.authentication_token: ${config.authentication_token}`);
        console.log(`token: ${token}`);
        console.log(`req.body: ${req.body}`);
        console.log(`req.body.token: ${req.body["token"]}`);
        if (token !== config.authentication_token) {
            res.status(401).json({ message: "Invalid token" });
            console.warn("/v1/getMealTypes: 401: Invalid token");
            return;
        }

        // Access the MealTypeRepo from DatabaseWrapper and fetch meal types.
        const mealTypes = await databaseWrapper.getMealTypeRepo().getAllMealTypes();
        if (!mealTypes) {
            res.status(500).json({ message: "Error fetching meal types" });
            console.error("/v1/getMealTypes: 500: Error fetching meal types");
            return;
        }

        // Respond with the fetched meal types.
        res.status(200).json({ mealTypes });
        console.log("/v1/getMealTypes: 200: Successfully fetched meal types");
    } catch (error) {
        res.status(500).json({ message: "Unhandled exception" });
        console.error(`/v1/getMealTypes: 500: Unhandled exception: ${error.message}`);
    }
});

// Gracefully close the database connection when the server stops.
process.on("SIGINT", () => {
    databaseWrapper.close();
    process.exit(0);
});


// Server init.
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });