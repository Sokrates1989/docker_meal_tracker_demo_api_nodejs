// Copyright (C) 2024 Patrick Michiels
// All rights reserved.
// This source code is licensed under the Evaluation License Agreement and
// may not be used, modified, or distributed without explicit permission from the author.
// This code is provided for evaluation purposes only.

/**
 * @fileoverview Entry point for the Docker Meal Tracker Demo API.
 *
 * @description 
 * <p>This <strong>index.js</strong> file initializes the API server using Express, sets up essential middleware,
 * configures route handling for user authentication and meal management, and establishes a database connection.
 * It is the main entry point for starting the backend server, providing the required API endpoints.</p>
 * 
 * <br/>
 * <h3>Project Overview</h3>
 * <p>The <strong>docker_meal_tracker_demo_api_nodejs</strong> provides a demonstration of backend API skills with a focus on:</p>
 * 
 * <ul>
 *   <li>User Authentication</li>
 *   <li>Meal Management: Add, Edit, Delete, and Retrieve meals</li>
 *   <li>Containerized Deployment: Deployed via Docker</li>
 * </ul>
 * 
 * <p>This API is designed for both local development and production environments.</p>
 * 
 * <p><strong>Note:</strong> This API is not intended for real-world use.</p>
 *
 * <p>
 * <strong>Links:</strong><br>
 * <ul>
 *   <li><a href="https://github.com/yourusername/docker_meal_tracker_demo_api_nodejs" target="_blank">GitHub Repository</a></li>
 *   <li><a href="https://github.com/yourusername/docker_meal_tracker_demo_api_nodejs/blob/main/README.md" target="_blank">README File</a></li>
 * </ul>
 * </p>
 *
 * @version 1.0.0
 * @license Evaluation License Agreement
 * @see {@link https://github.com/yourusername/docker_meal_tracker_demo_api_nodejs|GitHub Repository}
 * @see {@link https://github.com/yourusername/docker_meal_tracker_demo_api_nodejs/blob/main/README.md|README File}
 */


// Global / Public imports.
import express from "express";
import bodyParser from "body-parser";

// Own module imports
import { config } from "./src/config.js";
import databaseWrapper from "./src/databaseWrapper.js";
import mealRoutes from "./src/api-routes/mealRoutes.js";
import userRoutes from "./src/api-routes/userRoutes.js";
import tokenMiddleware from "./src/authentication/tokenMiddleware.js"; // Token verification middleware.
import userAuthMiddleware from "./src/authentication/userAuthMiddleware.js"; // User authentication middleware.

// Base variable initializations.
const app = express();
const port = config.api_port;

// Middleware initialization.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Endpoints from routes.
app.use("/v1/auth", tokenMiddleware, userAuthMiddleware, mealRoutes);
app.use("/v1", tokenMiddleware, userRoutes);

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

// Server Initialization.
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
