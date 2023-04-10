const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/HW16-employee")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
