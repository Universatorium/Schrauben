const express = require('express');
const router = express.Router();

//einbinden der Controller
const schrauben_controller = require("../controllers/schraubenController")

/* GET home page. */
//Route mit dem Controller der die Anfrage verarbeitet
router.get("/", schrauben_controller.getIndexPage);

//Detailsseite
router.get("/details/:hersteller", schrauben_controller.getDetailPage);






module.exports = router;


