// src/userAuthMiddleware.js
import databaseWrapper from "../databaseWrapper.js";

const userAuthMiddleware = async (req, res, next) => {
    const { userName, hashedPassword } = req.body;

    // Verify that both userName and hashedPassword are provided.
    if (!userName || !hashedPassword) {
        res.status(400).json({ message: "Username and password are required" });
        console.warn("Invalid request: Missing username or password");
        return;
    }

    // Check if the user's password is correct.
    const isPasswordCorrect = await databaseWrapper.getUserRepo().isUserPasswordCorrect({ userName, hashedPassword });
    if (!isPasswordCorrect) {
        res.status(401).json({ message: "Invalid credentials" });
        console.warn("Unauthorized access attempt with invalid credentials");
        return;
    }

    // Check if the user exists in the database.
    const user = await databaseWrapper.getUserRepo().getUserByCredentialsItem({ userName, hashedPassword });
    if (!user) {
        res.status(406).json({ message: "User does not exist" });
        console.warn("User does not exist in the database");
        return;
    }

    // Attach user information to the request object for further processing in routes.
    req.user = user;

    // Proceed to the next middleware or route handler.
    next();
};

export default userAuthMiddleware;
