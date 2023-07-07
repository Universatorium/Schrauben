const express = require('express');
const router = express.Router();

//einbinden der Controller
const schrauben_controller = require("../controllers/schraubenController")

/* GET home page. */
//Route mit dem Controller der die Anfrage verarbeitet
router.get("/", schrauben_controller.getIndexPage);

//Detailsseite
router.get("/details/:hersteller", schrauben_controller.getDetailPage);

router.get('/hilfe', function(req, res) {
    res.render('hilfe', { activePage: 'hilfe' });
});
    
router.get('/support', function(req, res) {
    res.render('support', { activePage: 'support' });
});



module.exports = router;


