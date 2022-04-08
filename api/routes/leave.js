const express = require("express");
const router = express.Router();
const Leave = require("../models/leave");
const Department = require("../models/department");
const leaveType = require("../models/leaveType");
const leave = require("../models/leave");

router.post("/addType", (req, res) => {
  const { name, status } = req.body;
  const LeaveType = new leaveType({
    name: name,
    status: status,
  });
  LeaveType.save()
    .then((result) => {
      res.status("201").json({
        message: "added leave type successfully",
        res: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status("404").json({
        message: "failed to add",
        error: error.message,
      });
    });
});

router.get("/getTypes", (req, res) => {
  leaveType
    .find({})
    .exec()
    .then((result) => {
      console.log(result);
      res.status("200").json({ message: "All types", res: result });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

router.post("/addDepartment", (req, res) => {
  const { department } = req.body;
  const dep = new Department({
    name: department,
  });
  dep
    .save()
    .then((result) => {
      res.status("201").json({
        message: "added successfully",
        res: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status("404").json({
        message: "failed to add",
        error: error.message,
      });
    });
});

router.get("/getDepartments", (req, res) => {
  Department.find({})
    .exec()
    .then((result) => {
      res.status("200").json({ res: result });
    })
    .catch((error) => {
      res.status("404").json(error.message);
    });
});

router.post("/leaveRequest", (req, res) => {
  const {
    requestDate,
    employeeID,
    employeeName,
    department,
    reason,
    otherReason,
    fromDate,
    toDate,
    approved,
    answered,
  } = req.body;

  const leave = new Leave({
    requestDate: requestDate,
    employeeID: employeeID,
    employeeName: employeeName,
    department: department,
    reason: reason,
    otherReason: otherReason,
    fromDate: fromDate,
    toDate: toDate,
    approved: approved,
    answered: answered,
  });

  leave
    .save()
    .then((result) => {
      res
        .status("200")
        .json({ message: "Leave request successfullt sent", res: result });
    })
    .catch((error) => {
      res.status("400").json({ error: error.message });
    });
});

router.get("/getLeaves", (req, res) => {
  leave
    .find({})
    .exec()
    .then((result) => {
      res.status("200").json({ message: "all leave requests", res: result });
    })
    .catch((error) => {
      res.status("400").json({ message: error.message });
    });
});

router.get("/updateRequest", (req, res) => {
  const { leaveID, ans } = req.query;

  leave.findByIdAndUpdate(
    leaveID,
    { approved: ans, answered: true },
    (err, docs) => {
      if (err) {
        console.log(err);
        res.status("404").json({ message: err.message });
      } else {
        console.log("Updated User : ", docs);
        res.status("200").json({ message: "successfully update", res: docs });
      }
    }
  );
});

router.get("/getLeave", (req, res) => {
  const { leaveID } = req.query;
  leave
    .findById(leaveID)
    .exec()
    .then((result) => {
      if (!result) {
        res.status("404").json({ message: "No request found with this id" });
      } else {
        res.status("200").json({ messsage: "found", res: result });
      }
    })
    .catch((error) => {
      res.status("404").json({ message: error.message });
    });
});

module.exports = router;
