const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const employee = require("./api/routes/employee");
const leave = require("./api/routes/leave");
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/test21", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
	console.log("we connected!");
});

//handling cors or use app.use(corse())
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "POST ,GET , PUT, DELETE, PATCH");
		return res.status(200).json({});
	}
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//handling error
/*
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
*/

//middleware for protecting and differentiate between different routes
app.use("/employee", employee);
app.use("/leave", leave);

const server = app.listen(port, function () {
	console.log(`Server running on port ${port}`);
});
