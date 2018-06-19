var express = require("express");
var router = express.Router();
var controller = require("../controllers/drillController");

router.get("/", controller.getAllDrills);

module.exports = router;
