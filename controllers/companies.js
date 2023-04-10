const isValidObjectId = require("../validator/ObjectId");
const { Company, validateCompany } = require("../models/company");
const { AppError } = require("../utils/appError");
module.exports = {
  getCompanies: async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const filter = {};
    let sort = { registrationDate: -1 };
    // if (req.query.province) {
    //   filter.province = req.query.province;
    // }
    // if (req.query.age) {
    //   const today = new Date();
    //   const ageLimitDate = new Date(
    //     today.getFullYear() - req.query.age,
    //     today.getMonth(),
    //     today.getDate()
    //   );
    //   filter.dateOfBirth = { $lte: ageLimitDate };
    // }
    // if (req.query.phone) {
    //   filter.phoneNumber = { $size: 1 };
    // }
    // if (req.query.role) {
    //   filter.roleInCompany = req.query.role;
    // }
    // if (req.query.gender) {
    //   filter.gender = req.query.gender;
    // }
    // if (req.query.registeredLastWeek) {
    //   const oneWeekAgo = new Date();
    //   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    //   filter.registrationDate = { $gte: oneWeekAgo };
    // }
    // if (req.query.sortBy === "ageAsc") {
    //   sort = { dateOfBirth: 1 };
    // }

    // // Sorting by age in descending order
    // if (req.query.sortBy === "ageDesc") {
    //   sort = { dateOfBirth: -1 };
    // }
    const pageSize = 6;
    const skipCount = (page - 1) * pageSize;
    const resCompanies = await Company.find(filter);
    const total = resCompanies.length;
    const companies = await Company.find(filter)
      .sort(sort)
      .skip(skipCount)
      .limit(pageSize)
      .select("-__v");

    res.send({ page, total, data: companies });
  },
  getCompanyById: async (req, res, next) => {
    res.send(req.company);
  },
  createCompany: async (req, res, next) => {
    const { error, value } = validateCompany(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if phone number already exists in database
    let existingCompany = await Company.findOne({
      landLineNumber: value.landLineNumber,
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use another land line phone number.",
        "fail",
        400
      );
      return next(ex);
    }
    // Check if registrationNumber already exists in database
    existingCompany = await Company.exists({
      registrationNumber: value.registrationNumber,
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use another registration number.",
        "fail",
        400
      );
      return next(ex);
    }
    const compnay = new Company(value);
    await compnay.save();
    res.status(201).send(compnay);
  },
  updateCompany: async (req, res, next) => {
    const { error, value } = validateCompany(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    // Check if phone number already exists in database
    let existingCompany = await Company.findOne({
      landLineNumber: value.landLineNumber,
      _id: { $ne: req.company._id }, // exclude company with specified id
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use another land line phone number.",
        "fail",
        400
      );
      return next(ex);
    }
    // Check if registrationNumber already exists in database
    existingCompany = await Company.exists({
      registrationNumber: value.registrationNumber,
      _id: { $ne: req.company._id }, // exclude company with specified id
    });
    if (existingCompany) {
      const ex = new AppError(
        "Use registration number.",
        "fail",
        400
      );
      return next(ex);
    }
    const company = req.company;
    company.set(value);
    await company.save();
    res.send(company);
  },
  deleteCompany: async (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
      const ex = new AppError("Invalid Id", "fail", 400);
      return next(ex);
    }
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      const ex = new AppError("Company not found", "fail", 404);
      return next(ex);
    }
    res.status(200).send("Company deleted successfully");
  },
};
