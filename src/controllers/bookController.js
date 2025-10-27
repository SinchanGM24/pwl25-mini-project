const Book = require("../models/bookModel");

async function getAll(req, res, next) {
	try {
		const books = await Book.getAllBooks();
		res.json(books);
	} catch (err) {
		next(err);
	}
}

async function getById(req, res, next) {
	try {
		const id = Number(req.params.id);
		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json({ message: "Invalid id" });
		}
		const book = await Book.getBookById(id);
		if (!book) return res.status(404).json({ message: "Book not found" });
		res.json(book);
	} catch (err) {
		next(err);
	}
}

async function getByAuthor(req, res, next) {
	try {
		const author = String(req.params.author);
		if (!String) {
			return res.status(404).json({ message: "Author tidak ditemukan" });
		}
		const book = await Book.getBookByAuthor(author);
		res.json(book);
	} catch (err) {
		next(err);
	}
}

async function create(req, res, next) {
	try {
		const created = await Book.createBook(req.body);
		res.status(201).json(created);
	} catch (err) {
		next(err);
	}
}

async function update(req, res, next) {
	try {
		const id = Number(req.params.id);
		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json({ message: "Invalid id" });
		}
		const exists = await Book.getBookById(id);
		if (!exists) return res.status(404).json({ message: "Book not found" });

		const ok = await Book.updateBook(id, req.body);
		if (!ok) return res.status(500).json({ message: "Update failed" });

		const updated = await Book.getBookById(id);
		res.json(updated);
	} catch (err) {
		next(err);
	}
}

async function remove(req, res, next) {
	try {
		const id = Number(req.params.id);
		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json({ message: "Invalid id" });
		}
		const exists = await Book.getBookById(id);
		if (!exists) return res.status(404).json({ message: "Book not found" });

		const ok = await Book.deleteBook(id);
		if (!ok) return res.status(500).json({ message: "Delete failed" });

		res.status(204).send();
	} catch (err) {
		next(err);
	}
}

module.exports = { getAll, getById, getByAuthor, create, update, remove };
