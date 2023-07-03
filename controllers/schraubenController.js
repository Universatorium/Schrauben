const Schrauben = require("../models/schraube");
const asyncHandler = require("express-async-handler");

console.log("test")

exports.getSchrauben = asyncHandler(async (req, res, next) => {
  const schrauben = await Schrauben.find();
  console.log("lero")
  console.log(schrauben)
  res.render("index", { schrauben });
});
