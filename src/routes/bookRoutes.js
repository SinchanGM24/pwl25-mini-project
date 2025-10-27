const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");
const { validateBook } = require("../middleware/validate");

// CRUD endpoints
router.get("/", controller.getAll); // GET /api/books
router.get("/:id", controller.getById); // GET /api/books/:id (numbers only)
router.get("/author/:author", controller.getByAuthor);
router.post("/", validateBook, controller.create); // POST /api/books
router.put("/:id", validateBook, controller.update); // PUT /api/books/:id
router.delete("/:id", controller.remove); // DELETE /api/books/:id

module.exports = router;
