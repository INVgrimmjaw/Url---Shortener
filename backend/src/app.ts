import express from "express";

export const app = express();

app.get("/health-check", (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Health check passed",
    });
});