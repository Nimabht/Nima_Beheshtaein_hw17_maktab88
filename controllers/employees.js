const isValidObjectId = require("../validator/ObjectId");
const { Employee, validateEmployee } = require("../models/employee");
const { Company } = require("../models/company");
const { AppError } = require("../utils/appError");
module.exports = {
  getEmployees: async (req, res, next) => {
    const page = parseInt(req.query.page);
    const filter = {};
    let sort = { registrationDate: -1 };
    if (req.query.province) {
      filter.province = req.query.province;
    }
    if (req.query.age) {
      const today = new Date();
      const ageLimitDate = new Date(
        today.getFullYear() - req.query.age,
        today.getMonth(),
        today.getDate()
      );
      filter.dateOfBirth = { $lte: ageLimitDate };
    }
    if (req.query.phone) {
      filter.phoneNumber = { $size: 1 };
    }
    if (req.query.role) {
      filter.roleInCompany = req.query.role;
    }
    if (req.query.gender) {
      filter.gender = req.query.gender;
    }
    if (req.query.registeredLastWeek) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filter.registrationDate = { $gte: oneWeekAgo };
    }
    if (req.query.sortBy === "ageAsc") {
      sort = { dateOfBirth: 1 };
    }

    // Sorting by age in descending order
    if (req.query.sortBy === "ageDesc") {
      sort = { dateOfBirth: -1 };
    }
    //check if companyId is in query
    const companyId = req.query.companyId; // get companyId from query parameter
    if (companyId) {
      filter.company = companyId; // add company filter to query if companyId is provided
    }
    let employees;
    const pageSize = 6;
    const skipCount = (page - 1) * pageSize;
    const resEmployees = await Employee.find(filter);
    const total = resEmployees.length;
    if (page) {
      employees = await Employee.find(filter)
        .sort(sort)
        .skip(skipCount)
        .limit(pageSize)
        .populate("company", "name _id")
        .select("-__v");
    } else {
      employees = await Employee.find(filter)
        .sort(sort)
        .populate("company", "name _id")
        .select("-__v");
    }
    res.send({ page, total, data: employees });
  },
  getEmployeeById: async (req, res, next) => {
    res.send(req.employee);
  },
  createEmployee: async (req, res, next) => {
    const { error, value } = validateEmployee(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if phone number already exists in database
    let existingEmployee = await Employee.findOne({
      phoneNumber: { $in: value.phoneNumber },
    });
    if (existingEmployee) {
      const ex = new AppError(
        "Use another phone number.",
        "fail",
        400
      );
      return next(ex);
    }
    // Check if numberId already exists in database
    existingEmployee = await Employee.exists({
      idNumber: value.idNumber,
    });
    if (existingEmployee) {
      const ex = new AppError("Use another ID number.", "fail", 400);
      return next(ex);
    }
    // Check if company exists in database
    const company = await Company.findOne({ _id: value.companyId });
    if (!company) {
      const ex = new AppError("Invalid Company.", "fail", 400);
      return next(ex);
    }

    const employee = new Employee({
      firstname: value.firstname,
      lastname: value.lastname,
      gender: value.gender,
      dateOfBirth: value.dateOfBirth,
      phoneNumber: value.phoneNumber,
      idNumber: value.idNumber,
      province: value.province,
      company: value.companyId,
      roleInCompany: value.roleInCompany,
    });
    await employee.save();
    res.status(201).send(employee);
  },
  updateEmployee: async (req, res, next) => {
    const { error, value } = validateEmployee(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if phone number already exists in database
    let existingEmployee = await Employee.findOne({
      phoneNumber: { $in: value.phoneNumber },
      _id: { $ne: req.employee._id }, // exclude employee with specified id
    });
    if (existingEmployee) {
      const ex = new AppError(
        "Use another phone number.",
        "fail",
        400
      );
      return next(ex);
    }
    // Check if numberId already exists in database
    existingEmployee = await Employee.exists({
      idNumber: value.idNumber,
      _id: { $ne: req.employee._id }, // exclude employee with specified id
    });
    if (existingEmployee) {
      const ex = new AppError("Use another ID number.", "fail", 400);
      return next(ex);
    }
    // Check if company exists in database
    const company = await Company.findOne({ _id: value.companyId });
    if (!company) {
      const ex = new AppError("Invalid Company.", "fail", 400);
      return next(ex);
    }
    const employee = req.employee;
    employee.set({
      firstname: value.firstname,
      lastname: value.lastname,
      gender: value.gender,
      dateOfBirth: value.dateOfBirth,
      phoneNumber: value.phoneNumber,
      idNumber: value.idNumber,
      province: value.province,
      company: value.companyId,
      roleInCompany: value.roleInCompany,
    });
    await employee.save();
    res.send(employee);
  },
  deleteEmployee: async (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
      const ex = new AppError("Invalid Id", "fail", 400);
      return next(ex);
    }
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      const ex = new AppError("Employee not found", "fail", 404);
      return next(ex);
    }
    res.status(200).send("Employee deleted successfully");
  },
};
