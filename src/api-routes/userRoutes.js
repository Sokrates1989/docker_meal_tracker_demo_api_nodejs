// src/api-routes/userRoutes.js
import express from "express";

const router = express.Router();

// Example user-related endpoint (replace with actual functionality)
router.post("/login", (req, res) => {
    res.json({ message: "User action endpoint" });
});

export default router;
