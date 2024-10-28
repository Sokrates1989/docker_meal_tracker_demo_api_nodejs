// src/api-routes/userRoutes.js
import express from "express";
import databaseWrapper from "../databaseWrapper.js";

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const credentials = req.body;

    try {
        const createUserResult = await databaseWrapper.getUserRepo().createNewUser_fromCredentialsItem(credentials);
        if (!createUserResult) {
            res.status(406).json({ message: 'user already exists' });
            console.warn(`/v1/register: 406: user already exists: ${credentials.userName}`);
        } else {
            res.status(200).json(createUserResult);
            console.info(`/v1/register: 200: successfully registered user: ${credentials.userName}`);
        }
    } catch (error) {
        console.error(`Error in /v1/register: ${error.message}`);
        res.status(500).json({ message: 'internal server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const credentials = req.body;

    try {
        const isPasswordCorrect = await databaseWrapper.getUserRepo().isUserPasswordCorrect(credentials);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'invalid password' });
            console.warn(`/v1/login: 401: invalid password: ${credentials.userName}`);
            return;
        }

        const user = await databaseWrapper.getUserRepo().getUserByCredentialsItem(credentials);
        if (!user) {
            res.status(406).json({ message: 'user does not exist' });
            console.warn(`/v1/login: 406: user does not exist: ${credentials.userName}`);
            return;
        }

        res.status(200).json(user);
        console.info(`/v1/login: 200: successfully logged user in: ${credentials.userName}`);
    } catch (error) {
        console.error(`Error in /v1/login: ${error.message}`);
        res.status(500).json({ message: 'internal server error' });
    }
});

export default router;
