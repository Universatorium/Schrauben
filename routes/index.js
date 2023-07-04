const express = require('express');
const router = express.Router();

const schrauben_controller = require("../controllers/schraubenController")

/* GET home page. */
router.get("/", schrauben_controller.getIndexPage);
// router.get("/top", schrauben_controller.gettopsales);
// router.get("/Hersteller", schrauben_controller.getTopHersteller);
// router.get("/besterTag", schrauben_controller.getBestSellingDay);


module.exports = router;


