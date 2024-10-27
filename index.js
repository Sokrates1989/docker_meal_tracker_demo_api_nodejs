// Global/ public imports.
import express from "express";
import bodyParser from "body-parser";

// Own module imports.
import { config } from "./src/config.js";
import databaseWrapper from "./src/databaseWrapper.js";
import mealRoutes from "./src/api-routes/mealRoutes.js";
import userRoutes from "./src/api-routes/userRoutes.js";

// Base var initialzitions.
const app = express();
const port = config.api_port;

// Middlewares.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Endpoints from routes.
app.use("/v1", mealRoutes); 
app.use("/v1", userRoutes);

  
// Endpoints.
app.get("/", (req, res) => {
    res.send(`<a href="https://github.com/Sokrates1989/docker_meal_tracker_demo_api_nodejs">GitHub Repository - Docker Meal Tracker Demo API (NodeJS)</a>`);
});

app.post("/", (req, res) => {
    res.send(`<a href="https://github.com/Sokrates1989/docker_meal_tracker_demo_api_nodejs">GitHub Repository - Docker Meal Tracker Demo API (NodeJS)</a>`);
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