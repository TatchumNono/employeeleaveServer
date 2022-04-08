const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  requestDate: { type: "String", required: true },
  employeeID: { type: "String", required: true },
  employeeName: { type: "String", required: true },
  department: { type: "String", required: true },
  reason: { type: "String", required: true },
  otherReason: { type: "String" },
  fromDate: { type: "String", required: true },
  toDate: { type: "String", required: true },
  approved: { type: "Boolean", required: true },
  answered: { type: "Boolean", required: true }, //to know whether the request has been answered or not
});

module.exports = mongoose.model("leave", leaveSchema);
