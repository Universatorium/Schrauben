const Schraube = require("../models/schraube");
const asyncHandler = require("express-async-handler");

console.log("hi")
exports.getSchrauben = asyncHandler(async (req, res, next) => {
    console.log("hi2")
  const schrauben = await Schraube.find();
  console.log("hi3")
    console.log(schrauben)
  res.render("index", { schrauben });
});
