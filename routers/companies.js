const express = require("express");
const asyncMiddleware = require("../middlewares/async.js");
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companies.js");
const getCompany = require("../middlewares/getCompany.js");
const router = express.Router();

router.get("/", asyncMiddleware(getCompanies));
router.get("/:id", getCompany, asyncMiddleware(getCompanyById));
router.post("/", asyncMiddleware(createCompany));
router.put("/:id", getCompany, asyncMiddleware(updateCompany));
router.delete("/:id", asyncMiddleware(deleteCompany));
module.exports = router;
