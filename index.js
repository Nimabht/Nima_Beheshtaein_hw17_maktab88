const express = require("express");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
require("./db/connection.js");
const companies = require("./routers/companies.js");
const employees = require("./routers/employees.js");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const { join } = require("path");
// import { fileURLToPath } from "url";
//--------------------------------------------------------------------------
Joi.objectId = JoiObjectId(Joi);
const app = express();

// const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.set("views", "./views");

app.use(express.json());

app.use("/api/company", companies);
app.use("/api/employee", employees);

app.get("/companies", (req, res) => {
  const filePath = join(__dirname, "views", "companies.html");
  res.sendFile(filePath);
});

app.get("/company/profile/:id", (req, res) => {
  const filePath = join(__dirname, "views", "company-profile.html");
  res.sendFile(filePath);
});

app.get("/company/edit/:id", (req, res) => {
  const filePath = join(__dirname, "views", "company-edit.html");
  res.sendFile(filePath);
});

app.get("/employees", (req, res) => {
  const filePath = join(__dirname, "views", "employees.html");
  res.sendFile(filePath);
});

app.get("/employee/profile/:id", (req, res) => {
  const filePath = join(__dirname, "views", "employee-profile.html");
  res.sendFile(filePath);
});

app.get("/employee/edit/:id", (req, res) => {
  const filePath = join(__dirname, "views", "employee-edit.html");
  res.sendFile(filePath);
});

app.get("/employee/new", (req, res) => {
  const filePath = join(__dirname, "views", "employee-new.html");
  res.sendFile(filePath);
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
