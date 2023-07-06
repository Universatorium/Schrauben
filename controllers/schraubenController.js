const schraube = require('../models/schraube');
const asyncHandler = require("express-async-handler");

const charts = ['bestdayever','top3hersteller','top3schrauben','bestdayofweek','saph'];
const herstellercharts =['details','top3schrauben'];
//,'gsmth','gsmth','HerstellerSchrauben','saph','schraubenart',

exports.getIndexPage = asyncHandler(async (req, res, next) => {

  //Filtermenu dropdown
  // Hole alle eindeutigen Schraubenarten aus der Datenbank
  const schraubenarten = await schraube.distinct('Schraube');

  // Holen alle eindeutigen Monate aus der Datenbank
  const daten = await schraube.distinct('Datum');
  const monateSet = new Set(daten.map(date => date.slice(0, 7)));
  const monate = Array.from(monateSet);

  const { schraubenart, monat } = req.query;
  console.log('lero')
  console.log(schraubenart, monat)
    // Erzeuge eine MongoDB-Query, um nach dem ausgewählten Monat zu filtern
    const query = monat ? { Datum: { $regex: `^${monat}` } } : {};

    // Finde die Umsatzdaten für die ausgewählte Schraubenart und den Monat
    const umsatzData = await schraube.aggregate([
      { $match: { Schraube: schraubenart, ...query } },
      { $group: { _id: '$Datum', umsatz: { $sum: '$VerkaufteMenge' } } },
      { $sort: { _id: 1 } }
    ]);

    // Konvertiere das Datum in ein Dateiformat
    const formattedData = umsatzData.map(data => ({
      datum: new Date(data._id).toDateString(),
      umsatz: data.umsatz
    }));

  //Top 3 Schrauben
  const topSchrauben = await schraube.aggregate([
    { $sort: { VerkaufteMenge: -1 } },
    { $group: { _id: "$Schraube", VerkaufteMenge: { $first: "$VerkaufteMenge" } } },
    { $sort: { VerkaufteMenge: -1 } },
    { $limit: 3 },
    { $project: { _id: 0, Schraube: "$_id", VerkaufteMenge: 1 } }
  ]);
  console.log(topSchrauben);

  //Top 3 Hersteller
  const topHersteller = await schraube.aggregate([
    { $group: { _id: "$Hersteller", VerkaufteMenge: { $sum: "$VerkaufteMenge" } } },
    { $sort: { VerkaufteMenge: -1 } },
    { $limit: 3 },
    { $project: { _id: 0, Hersteller: "$_id", VerkaufteMenge: 1 } }
  ]);
  console.log(topHersteller);

  //Bester Verkaufstag insgesamt
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
  
  console.log('Schraubenart:', schraubenart);
    console.log('Monat:', monat);
    console.log('Umsatzdaten:', umsatzData);
    console.log('Formatierte Daten:', formattedData);

  res.render("index", { topSchrauben, topHersteller, bestday, bestDayOfWeek, charts, schraubenarten, monate , umsatzData: formattedData, monate });
});

//Prozentualer Anteil der Schraubenverkäufe von Hersteller X
exports.getDetailPage = asyncHandler(async (req, res, next) => {
  const hersteller = req.params.hersteller;

const totalSales = await schraube.aggregate([
  { $match: { Hersteller: hersteller } },
  { $group: { _id: null, total: { $sum: '$VerkaufteMenge' } } }
]);

const total = totalSales[0].total;

const schraubenarten = await schraube.aggregate([
  { $match: { Hersteller: hersteller } },
  { $group: { _id: '$Schraube', count: { $sum: '$VerkaufteMenge' } } }
]);

const percentageData = schraubenarten.map(schraube => ({
  schraubenart: schraube._id,
  percentage: (schraube.count / total) * 100
}));

percentageData.forEach(schraube => {
  console.log(`Schraube: ${schraube.schraubenart}, Prozent: ${schraube.percentage}%`);
});

//test kann geloescht werden 
const topSchrauben = await schraube.aggregate([
  { $sort: { VerkaufteMenge: -1 } },
  { $group: { _id: "$Schraube", VerkaufteMenge: { $first: "$VerkaufteMenge" } } },
  { $sort: { VerkaufteMenge: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, Schraube: "$_id", VerkaufteMenge: 1 } }
]);

res.render('details', { hersteller, percentageData, herstellercharts, charts, topSchrauben });
  
});


