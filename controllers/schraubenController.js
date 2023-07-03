const schraube = require('../models/schraube');
const asyncHandler = require("express-async-handler");

exports.getSchrauben = asyncHandler(async (req, res, next) => {
  const schrauben = await schraube.find();
  res.render("index", { schrauben });
});

exports.gettopsales = asyncHandler(async (req, res, next) => {
  const topSchrauben = await schraube.aggregate([
    { $sort: { VerkaufteMenge: -1 } },
    { $group: { _id: "$Schraube", VerkaufteMenge: { $first: "$VerkaufteMenge" } } },
    { $sort: { VerkaufteMenge: -1 } },
    { $limit: 3 },
    { $project: { _id: 0, Schraube: "$_id", VerkaufteMenge: 1 } }
  ]);
  res.render("index", { schrauben: topSchrauben });
});

exports.getTopHersteller = asyncHandler(async (req, res, next) => {
  const topHersteller = await schraube.aggregate([
    { $group: { _id: "$Hersteller", VerkaufteMenge: { $sum: "$VerkaufteMenge" } } },
    { $sort: { VerkaufteMenge: -1 } },
    { $limit: 3 },
    { $project: { _id: 0, Hersteller: "$_id", VerkaufteMenge: 1 } }
  ]);
  res.render("index", { schrauben : topHersteller });
});


exports.getBestSellingDay = asyncHandler(async (req, res, next) => {
  const day = await schraube.aggregate([
    {
      $group: {
        _id: {
          year: { $year: { $toDate: "$Datum" } }, // Konvertiert den String in ein Datum
          month: { $month: { $toDate: "$Datum" } },
          day: { $dayOfMonth: { $toDate: "$Datum" } }
        },
        totalSales: { $sum: "$VerkaufteMenge" }
      }
    },
    { $sort: { totalSales: -1 } },
    { $limit: 1 }
  ]);
  res.render("index", { schrauben : day });
});


