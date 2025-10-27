const app = require("./app");
const pool = require("./config/db");
const mysql = require("mysql2/promise");

const PORT = process.env.PORT || 3000;

async function ensureDatabase() {
	const {
		DB_HOST = "localhost",
		DB_PORT = 3306,
		DB_USER = "root",
		DB_PASSWORD = "",
		DB_NAME = "miniproject_db",
	} = process.env;
	const conn = await mysql.createConnection({
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASSWORD,
		multipleStatements: true,
	});
	await conn.execute(
		"CREATE DATABASE IF NOT EXISTS `" +
			DB_NAME +
			"` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
	);
	await conn.end();
}

async function ensureTable() {
	const sql = `
  CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
	await pool.execute(sql);
}

async function start() {
	try {
		await ensureDatabase();
		await ensureTable();
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error(
			"Failed to start server:",
			err && (err.message || err.code || err)
		);
		if (err && err.stack) console.error(err.stack);
		process.exit(1);
	}
}

start();
