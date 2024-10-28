import { config } from "../config.js";

const tokenMiddleware = (req, res, next) => {
    const { token } = req.body;

    if (token !== config.authentication_token) {
        res.status(401).json({ message: "Invalid token" });
        console.warn("Unauthorized access attempt with invalid token");
        return;
    }

    // If token is valid, proceed to the next middleware or route handler
    next();
};

export default tokenMiddleware;
