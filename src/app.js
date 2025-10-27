require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Middlewares
app.use(logger);
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/books/author", bookRoutes);

// 404 handler
app.use((req, res, next) => {
	res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use(errorHandler);

module.exports = app;
