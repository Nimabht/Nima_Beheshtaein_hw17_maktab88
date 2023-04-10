const express = require("express");
const asyncMiddleware = require("../middlewares/async.js");
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees.js");
const getEmployee = require("../middlewares/getEmployee.js");

const router = express.Router();

router.get("/", asyncMiddleware(getEmployees));
router.get("/:id", getEmployee, asyncMiddleware(getEmployeeById));
router.post("/", asyncMiddleware(createEmployee));
router.put("/:id", getEmployee, asyncMiddleware(updateEmployee));
router.delete("/:id", asyncMiddleware(deleteEmployee));
module.exports = router;
