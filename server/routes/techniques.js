var express = require("express");
var router = express.Router();
var Technique = require("../models/Technique");

router.get("/", function(req, res, next) {
  Technique.find({}, function(err, techniques) {
    res.send(techniques);
  });
});

router.post("/", function(req, res, next) {
  const { data, entityData, userId } = req.body;

  console.log("Adding", data, entityData);

  const record = {
    userId: userId,
    name: data.name,
    type: data.type,
    variation: data.variation,
    counters: [],
    nextSteps: [],
    notes: data.notes
  };

  Technique.create(record, (err, addedTechnique) => {
    console.log("addedTechnique", addedTechnique);
    //Add the link to the parent technique
    Technique.findById(entityData.parent, (err, parentTechnique) => {
      parentTechnique[entityData.entity] = [
        ...parentTechnique[entityData.entity],
        addedTechnique._id
      ];
      console.log("parentTechnique before save", parentTechnique);
      parentTechnique.save();
      res.jsonp(addedTechnique);
    });

    //console.log(err, technique);
  });
});

module.exports = router;
