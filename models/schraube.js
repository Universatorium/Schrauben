const mongoose = require("mongoose");

const schraubeSchema = new mongoose.Schema({
  Hersteller: String,
  Schraube: String,
  Preis: Number,
  VerkaufteMenge: Number,
  Datum: Date
});

module.exports = mongoose.model("Schrauben", schraubeSchema);
