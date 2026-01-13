// Copyright (C) 2024 Patrick Michiels
// All rights reserved.
// This source code is licensed under the Evaluation License Agreement and
// may not be used, modified, or distributed without explicit permission from the author.
// This code is provided for evaluation purposes only.

import databaseWrapper from "../databaseWrapper.js";

/**
 * @function userAuthMiddleware
 * @description Middleware for user authentication. Verifies the user's credentials by checking the username and hashed password.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to pass control to the next middleware or route handler.
 * @returns {void} Responds with 400 if credentials are missing, 401 if invalid, or 406 if the user does not exist; otherwise, proceeds to the next middleware.
 */
const userAuthMiddleware = async (req, res, next) => {
    // Check for user credentials directly in the request body or within the "credentials" object
    const userName = req.body.userName || (req.body.credentials && req.body.credentials.userName);
    const hashedPassword = req.body.hashedPassword || (req.body.credentials && req.body.credentials.hashedPassword);

    // Verify that both userName and hashedPassword are provided
    if (!userName || !hashedPassword) {
        res.status(400).json({ message: "Username and password are required" });
        console.warn("Invalid request: Missing username or password");
        return;
    }

    // Check if the user's password is correct
    const isPasswordCorrect = await databaseWrapper.getUserRepo().isUserPasswordCorrect({ userName, hashedPassword });
    if (!isPasswordCorrect) {
        res.status(401).json({ message: "Invalid credentials" });
        console.warn("Unauthorized access attempt with invalid credentials");
        return;
    }

    // Check if the user exists in the database
    const user = await databaseWrapper.getUserRepo().getUserByCredentialsItem({ userName, hashedPassword });
    if (!user) {
        res.status(406).json({ message: "User does not exist" });
        console.warn("User does not exist in the database");
        return;
    }

    // Attach user information to the request object for further processing in routes
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
};

export default userAuthMiddleware;
