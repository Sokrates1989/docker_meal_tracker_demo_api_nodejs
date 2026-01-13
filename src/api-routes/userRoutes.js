// Copyright (C) 2024 Patrick Michiels
// All rights reserved.
// This source code is licensed under the Evaluation License Agreement and
// may not be used, modified, or distributed without explicit permission from the author.
// This code is provided for evaluation purposes only.

import express from "express";
import databaseWrapper from "../databaseWrapper.js";

const router = express.Router();

/**
 * @route POST /register
 * @description Registers a new user if the username does not already exist.
 * @returns {Object} Created user details if successful, or an error message if user already exists or if an internal error occurs.
 */
router.post('/register', async (req, res) => {
    const credentials = req.body;

    try {
        const createUserResult = await databaseWrapper.getUserRepo().createNewUser_fromCredentialsItem(credentials);
        if (!createUserResult) {
            res.status(406).json({ message: 'User already exists' });
            console.warn(`/v1/register: 406: user already exists: ${credentials.userName}`);
        } else {
            res.status(200).json(createUserResult);
            console.info(`/v1/register: 200: successfully registered user: ${credentials.userName}`);
        }
    } catch (error) {
        console.error(`Error in /v1/register: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

/**
 * @route POST /login
 * @description Authenticates a user based on provided credentials.
 * @returns {Object} User details if successful, or an error message if the password is invalid, the user does not exist, or if an internal error occurs.
 */
router.post('/login', async (req, res) => {
    const credentials = req.body;

    try {
        const isPasswordCorrect = await databaseWrapper.getUserRepo().isUserPasswordCorrect(credentials);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'Invalid password' });
            console.warn(`/v1/login: 401: invalid password: ${credentials.userName}`);
            return;
        }

        const user = await databaseWrapper.getUserRepo().getUserByCredentialsItem(credentials);
        if (!user) {
            res.status(406).json({ message: 'User does not exist' });
            console.warn(`/v1/login: 406: user does not exist: ${credentials.userName}`);
            return;
        }

        res.status(200).json(user);
        console.info(`/v1/login: 200: successfully logged user in: ${credentials.userName}`);
    } catch (error) {
        console.error(`Error in /v1/login: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
