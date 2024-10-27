// src/config.js
import dotenv from "dotenv";

dotenv.config();

export const config = {
    authentication_token: process.env.AUTHENTICATION_TOKEN,
    api_port: process.env.API_PORT || 3000,
    db_user: process.env.DB_USER,
    db_host: process.env.DB_HOST,
    db_database: process.env.DB_DATABASE,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
};
