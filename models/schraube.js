const mongoose = require("mongoose");

const schraubeSchema = new mongoose.Schema({
  Hersteller: String,
  Schraube: String,
  Preis: Number,
  VerkaufteMenge: Number,
  Datum: Date
});

const schraubenModel = mongoose.model("Schrauben", schraubeSchema,'Schrauben');

module.exports = schraubenModel;