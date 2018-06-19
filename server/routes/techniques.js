var express = require("express");
var router = express.Router();
var controller = require("../controllers/techniqueController");

router.get("/", controller.getAllTechniques);
router.post("/", controller.addTechnique);

module.exports = router;
