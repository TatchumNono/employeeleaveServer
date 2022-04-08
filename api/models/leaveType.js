const mongoose = require("mongoose");

const leaveTypeSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  status: { type: "Boolean", required: true },
});

module.exports = mongoose.model("leaveType", leaveTypeSchema);
