// Copyright (C) 2024 Patrick Michiels
// All rights reserved.
// This source code is licensed under the Evaluation License Agreement and
// may not be used, modified, or distributed without explicit permission from the author.
// This code is provided for evaluation purposes only.


/**
 * @fileoverview <p><strong>Configuration file for setting up environment variables.</strong></p>
 * 
 * <p>This file loads environment variables from the <code>.env</code> file using <code>dotenv</code>, 
 * and exports a <code>config</code> object that includes application-specific settings:</p>
 * 
 * <p><strong>Note:</strong> Ensure that all required environment variables are set in the <code>.env</code> file.</p>
 */

// Import environment configuration
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Configuration object containing environment variables for application setup.
 * @const {Object} config
 * @property {string} authentication_token - Token for authentication processes.
 * @property {number} api_port - Port on which the API server will run (default: 3000).
 * @property {string} db_user - Database user for DB connection.
 * @property {string} db_host - Database host for DB connection.
 * @property {string} db_database - Database name for DB connection.
 * @property {string} db_password - Database password for DB connection.
 * @property {number} db_port - Database port for DB connection.
 */
export const config = {
    authentication_token: process.env.AUTHENTICATION_TOKEN,
    api_port: process.env.API_PORT || 3000,
    db_user: process.env.DB_USER,
    db_host: process.env.DB_HOST,
    db_database: process.env.DB_DATABASE,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
};
