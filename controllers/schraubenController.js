const schraube = require('../models/schraube');
const asyncHandler = require("express-async-handler");

console.log("test")

exports.getSchrauben = asyncHandler(async (req, res, next) => {
  const schrauben = await schraube.find();
  res.render("index", { schrauben });
});
