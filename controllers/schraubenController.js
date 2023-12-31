const schraube = require('../models/schraube');
const asyncHandler = require("express-async-handler");

//Charts die fuer den Index eingebunden werden soll ->
const charts = ['bestdayever','top3hersteller','top3schrauben','bestdayofweek','saph'];

//Charts die fuer den Details seite eingebunden werden soll ->
const herstellercharts =['details','schraubenart', 'schraubenumsatz', 'saph'];

//Controller fuer den Index -->
exports.getIndexPage = asyncHandler(async (req, res, next) => {
  //Filtermenu dropdown
  // Hole alle eindeutigen Schraubenarten aus der Datenbank
  const schraubenarten = await schraube.distinct('Schraube');

  // Holen alle eindeutigen Monate aus der Datenbank
  const daten = await schraube.distinct('Datum');
  const monateSet = new Set(daten.map(date => date.slice(0, 7)));
  const monate = Array.from(monateSet);

  const { schraubenart, monat } = req.query;
  
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
  //Filter zuende

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
  
  
  // console.log('Schraubenart:', schraubenart);
  //   console.log('Monat:', monat);
  //   console.log('Umsatzdaten:', umsatzData);
  //   console.log('Formatierte Daten:', formattedData);

  res.render("index", { topSchrauben, topHersteller, bestday, bestDayOfWeek, charts, schraubenarten, umsatzData: formattedData, monate, schraubenart });
});


//Controller fuer den Deteils seite -->
exports.getDetailPage = asyncHandler(async (req, res, next) => {
  const hersteller = req.params.hersteller;

const totalSales = await schraube.aggregate([
  { $match: { Hersteller: hersteller } },
  { $group: { _id: null, total: { $sum: '$VerkaufteMenge' } } }
]);

const total = totalSales[0].total; 

// gesamtanzahl als zahl der Schrauben
const schraubenarten = await schraube.aggregate([
  { $match: { Hersteller: hersteller } },
  { $group: { _id: '$Schraube', count: { $sum: '$VerkaufteMenge' }, Preis: { $first: '$Preis' } } }

  // { $group: { _id: '$Schraube', count: { $sum: '$VerkaufteMenge' }, Preis: '$Preis' } }
]);

//total in Prozent
const percentageData = schraubenarten.map(schraube => ({
  schraubenart: schraube._id,
  percentage: (schraube.count / total) * 100
}));
const umsatz = schraubenarten.map(schraube => ({
  schraubenart: schraube._id,
  gesamtumsatz: (schraube.count * schraube.Preis)
}));

percentageData.forEach(schraube => {
  // console.log(`Schraube: ${schraube.schraubenart}, Prozent: ${schraube.percentage}%`);
});

//Filtermenu dropdown
  // Hole alle eindeutigen Schraubenarten aus der Datenbank
  const schrauben = await schraube.distinct('Schraube');

  // Hole alle eindeutigen Monate aus der Datenbank
  const daten = await schraube.distinct('Datum');
  const monateSet = new Set(daten.map(date => date.slice(0, 7)));
  const monate = Array.from(monateSet);

  const { schraubenart, monat } = req.query;
  
    // Erzeuge eine MongoDB-Query, um nach dem ausgewählten Monat zu filtern
    const query = monat ? { Datum: { $regex: `^${monat}` } } : {};

    // Finde die Umsatzdaten für die ausgewählte Schraubenart und den Monat
    const umsatzData = await schraube.aggregate([
      { $match: { Schraube: schraubenart,Hersteller: hersteller, ...query } },
      { $group: { _id: '$Datum', umsatz: { $sum: '$VerkaufteMenge' } } },
      { $sort: { _id: 1 } }
    ]);

    // Konvertiere das Datum in ein Dateiformat
    const formattedData = umsatzData.map(data => ({
      datum: new Date(data._id).toDateString(),
      umsatz: data.umsatz
    }));
  //Filter zuende

  const gesamtumsatz = await schraube.aggregate([
    { $match: { Hersteller: hersteller, ...query } },
    { $group: { _id: null, umsatz: { $sum: { $multiply: ['$Preis', '$VerkaufteMenge'] } } } }
  ]);
  
  const gesamtumsatzHersteller = gesamtumsatz[0].umsatz;
    
  //Matze
  console.log(gesamtumsatzHersteller)

res.render('details', { hersteller, percentageData, herstellercharts, monate,umsatzData: formattedData, schrauben, schraubenart, schraubenarten, umsatz, gesamtumsatzHersteller });
  
});

