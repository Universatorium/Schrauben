const schraube = require('../models/schraube');
const asyncHandler = require("express-async-handler");

const charts = ['bestdayever','top3hersteller','top3schrauben','bestdayofweek'];
//,'gsmth','gsmth','HerstellerSchrauben','saph','schraubenart',
exports.getIndexPage = asyncHandler(async (req, res, next) => {
  const topSchrauben = await schraube.aggregate([
    { $sort: { VerkaufteMenge: -1 } },
    { $group: { _id: "$Schraube", VerkaufteMenge: { $first: "$VerkaufteMenge" } } },
    { $sort: { VerkaufteMenge: -1 } },
    { $limit: 3 },
    { $project: { _id: 0, Schraube: "$_id", VerkaufteMenge: 1 } }
  ]);
  console.log(topSchrauben);

  const topHersteller = await schraube.aggregate([
    { $group: { _id: "$Hersteller", VerkaufteMenge: { $sum: "$VerkaufteMenge" } } },
    { $sort: { VerkaufteMenge: -1 } },
    { $limit: 3 },
    { $project: { _id: 0, Hersteller: "$_id", VerkaufteMenge: 1 } }
  ]);
  console.log(topHersteller);

  const bestday = await schraube.aggregate([
    {
      $group: {
        _id: {
          year: { $year: { $toDate: "$Datum" } },
          month: { $month: { $toDate: "$Datum" } },
          day: { $dayOfMonth: { $toDate: "$Datum" } }
        },
        totalSales: { $sum: "$VerkaufteMenge" }
      }
    },
    { $sort: { totalSales: -1 } },
    { $limit: 3 },
    {
      $project: {
        _id: 0,
        label: {
          $concat: [
            { $toString: "$_id.day" },
            "/",
            { $toString: "$_id.month" },
            "/",
            { $toString: "$_id.year" }
          ]
        },
        totalSales: 1
      }
    }
  ]);
  console.log(bestday);

  //bestDayofWeek
  const sort = await schraube.aggregate([
    {
      $group: {
        _id: { $dayOfWeek: { $toDate: "$Datum" } },
        averageSales: { $avg: "$VerkaufteMenge" }
      }
    },
    { $sort: { "_id": 1 } },
    { $project: { _id: 0, dayOfWeek: "$_id", averageSales: 1 } }
  ]);
  
  const slice = sort.map(item => {
    console.log(item); // Konsolenausgabe des Wochentags als Zahl
    return item;
  });
  
  const bestDayOfWeek = [...slice.slice(1), slice[0]];
  
  console.log(bestDayOfWeek);
  
  res.render("index", { topSchrauben, topHersteller, bestday, bestDayOfWeek, charts });
});


// exports.getSchrauben = asyncHandler(async (req, res, next) => {
//   const schrauben = await schraube.find();
//   res.render("index", { schrauben, charts });
// });

// exports.gettopsales = asyncHandler(async (req, res, next) => {
//   const topSchrauben = await schraube.aggregate([
//     { $sort: { VerkaufteMenge: -1 } },
//     { $group: { _id: "$Schraube", VerkaufteMenge: { $first: "$VerkaufteMenge" } } },
//     { $sort: { VerkaufteMenge: -1 } },
//     { $limit: 3 },
//     { $project: { _id: 0, Schraube: "$_id", VerkaufteMenge: 1 } }
//   ]);
//   res.render("index", { schrauben: topSchrauben, charts });
// });

// exports.getTopHersteller = asyncHandler(async (req, res, next) => {
//   const topHersteller = await schraube.aggregate([
//     { $group: { _id: "$Hersteller", VerkaufteMenge: { $sum: "$VerkaufteMenge" } } },
//     { $sort: { VerkaufteMenge: -1 } },
//     { $limit: 3 },
//     { $project: { _id: 0, Hersteller: "$_id", VerkaufteMenge: 1 } }
//   ]);
//   res.render("index", { schrauben : topHersteller, charts  });
// });


// exports.getBestSellingDay = asyncHandler(async (req, res, next) => {
//   const bestday = await schraube.aggregate([
//     {
//       $group: {
//         _id: {
//           year: { $year: { $toDate: "$Datum" } }, // Konvertiert den String in ein Datum
//           month: { $month: { $toDate: "$Datum" } },
//           day: { $dayOfMonth: { $toDate: "$Datum" } }
//         },
//         totalSales: { $sum: "$VerkaufteMenge" }
//       }
//     },
//     { $sort: { totalSales: -1 } },
//     { $limit: 1 }
//   ]);
//   res.render("index", { schrauben : bestday, charts });
// });


