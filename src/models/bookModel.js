const pool = require("../config/db");

async function getAllBooks() {
	const [rows] = await pool.execute(
		"SELECT id, title, author, year, price, stock, created_at FROM books ORDER BY id DESC"
	);
	return rows;
}

async function getBookById(id) {
	const [rows] = await pool.execute(
		"SELECT id, title, author, year, price, stock, created_at FROM books WHERE id = ?",
		[id]
	);
	return rows[0] || null;
}

async function getBookByAuthor(author) {
	const [rows] = await pool.execute(
		"SELECT id,title, author,year, price, stock, created_at FROM books where author = ? ",
		[author]
	);
	return rows;
}

async function createBook({ title, author, year, price, stock }) {
	const [result] = await pool.execute(
		"INSERT INTO books (title, author, year, price, stock) VALUES (?, ?, ?, ?, ?)",
		[title, author, year, price, stock]
	);
	return { id: result.insertId, title, author, year, price, stock };
}

async function updateBook(id, { title, author, year, price, stock }) {
	const [result] = await pool.execute(
		"UPDATE books SET title = ?, author = ?, year = ?, price = ?, stock = ? WHERE id = ?",
		[title, author, year, price, stock, id]
	);
	return result.affectedRows > 0;
}

async function deleteBook(id) {
	const [result] = await pool.execute("DELETE FROM books WHERE id = ?", [id]);
	return result.affectedRows > 0;
}

module.exports = {
	getAllBooks,
	getBookById,
	getBookByAuthor,
	createBook,
	updateBook,
	deleteBook,
};
