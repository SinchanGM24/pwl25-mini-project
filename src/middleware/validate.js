// Validate middleware for Books
// POST: require all fields
// PUT: require all fields (full update)
function validateBook(req, res, next) {
	const { title, author, year, price, stock } = req.body || {};

	const errors = [];

	const isEmpty = (v) =>
		v === undefined || v === null || (typeof v === "string" && v.trim() === "");

	if (isEmpty(title)) errors.push("title is required");
	if (isEmpty(author)) errors.push("author is required");
	if (isEmpty(year)) errors.push("year is required");
	if (isEmpty(price)) errors.push("price is required");
	if (isEmpty(stock)) errors.push("stock is required");

	const yearNum = Number(year);
	const priceNum = Number(price);
	const stockNum = Number(stock);

	if (!Number.isInteger(yearNum) || yearNum <= 0)
		errors.push("year must be a positive integer");
	if (!Number.isFinite(priceNum) || priceNum < 0)
		errors.push("price must be a non-negative number");
	if (!Number.isInteger(stockNum) || stockNum < 0)
		errors.push("stock must be a non-negative integer");

	if (errors.length > 0) {
		return res.status(400).json({ message: "Validation error", errors });
	}

	// normalize types
	req.body.year = yearNum;
	req.body.price = priceNum;
	req.body.stock = stockNum;

	next();
}

module.exports = { validateBook };
