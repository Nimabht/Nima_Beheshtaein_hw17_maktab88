const express = require("express");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
require("./db/connection.js");
// import globalErrorHandler from "./middlewares/globalErrorHandler.js";
// import employees from "./routes/employees.js";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";
//--------------------------------------------------------------------------
Joi.objectId = JoiObjectId(Joi);
const app = express();

// const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));
app.set("views", "./views");

app.use(express.json());

// app.use("/api/employee", employees);

// app.get("/home", (req, res) => {
//   const filePath = join(__dirname, "views", "home.html");
//   res.sendFile(filePath);
// });

// app.get("/profile/:id", (req, res) => {
//   const filePath = join(__dirname, "views", "profile.html");
//   res.sendFile(filePath);
// });

// app.get("/edit/:id", (req, res) => {
//   const filePath = join(__dirname, "views", "edit.html");
//   res.sendFile(filePath);
// });

// app.get("/new", (req, res) => {
//   const filePath = join(__dirname, "views", "new.html");
//   res.sendFile(filePath);
// });

// app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
