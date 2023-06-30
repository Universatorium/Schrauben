const express = require('express');
const router = express.Router();

const schrauben_controller = require("../controllers/schraubenController")

/* GET home page. */
router.get("/", schrauben_controller.getSchrauben);

module.exports = router;
