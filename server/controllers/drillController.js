//var Drill = require("../models/Drill");

const getAllDrills = (req, res, next) => {
  //   Drill.find({}, null, { sort: { name: "asc" } }, function(
  //     err,
  //     drills
  //   ) {
  //     res.send(drills);
  //   });
  const drill = {
    userId: 1,
    name: "Movement Drill 1",
    steps: [
      {
        techniqueId: "5b19384dce9312482c3ec80d",
        isOpponent: true
      },
      {
        techniqueId: "5b1938c0ce9312482c3ec812",
        isOpponent: false
      },
      {
        techniqueId: "5b193886ce9312482c3ec810",
        isOpponent: false
      },
      {
        techniqueId: "5b193891ce9312482c3ec811",
        isOpponent: false
      }
    ]
  };
  res.send([drill]);
};

module.exports = { getAllDrills };
