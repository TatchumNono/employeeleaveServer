const express = require("express");
const employee = require("../models/employee");
const router = express.Router();
const Employee = require("../models/employee");

router.post("/add", (req, res) => {
	const { firstName, lastName, username, department, password, priviledge } = req.body;
	const employee = new Employee({
		firstName: firstName,
		lastName: lastName,
		username: username,
		department: department,
		password: password,
		priviledge: priviledge,
	});
	employee
		.save()
		.then((result) => {
			res.status(201).json({
				message: "User Created!",
				user: result,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Did not succed",
			});
		});
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;
	employee
		.findOne({ username: username })
		.exec()
		.then((result) => {
			console.log(result);
			if (!result) {
				res.status(204).json({ message: "No such user in the system" });
			} else {
				if (result.password === password) {
					res.status(200).json({ message: "login successful", res: result });
				} else {
					res.status(400).json({ message: "Wrong password" });
				}
			}
		})
		.catch((error) => {
			console.log(error.message);
		});
});

router.get("/employees", (req, res) => {
	Employee.find({})
		.exec()
		.then((result) => {
			res.status(200).json({
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
});

module.exports = router;
