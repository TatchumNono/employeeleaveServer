const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: "String", required: true },
  lastName: { type: "String", required: true },
  username: { type: "String", required: true },
  department: { type: "String", required: true },
  password: { type: "String", required: true },
  priviledge: { type: "String" },
});

module.exports = mongoose.model("Employee", employeeSchema);
