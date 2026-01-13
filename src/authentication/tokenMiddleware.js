// Copyright (C) 2024 Patrick Michiels
// All rights reserved.
// This source code is licensed under the Evaluation License Agreement and
// may not be used, modified, or distributed without explicit permission from the author.
// This code is provided for evaluation purposes only.

import { config } from "../config.js";

/**
 * @function tokenMiddleware
 * @description Middleware for token verification. Validates the token from the request body or credentials object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to pass control to the next middleware or route handler.
 * @returns {void} Responds with 401 Unauthorized if token is invalid; otherwise, proceeds to the next middleware.
 */
const tokenMiddleware = (req, res, next) => {
    const token = req.body.token || (req.body.credentials && req.body.credentials.token);

    if (token !== config.authentication_token) {
        res.status(401).json({ message: "Invalid token" });
        console.warn("Unauthorized access attempt with invalid token");
        return;
    }

    // If token is valid, proceed to the next middleware or route handler
    next();
};

export default tokenMiddleware;
