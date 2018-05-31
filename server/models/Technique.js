var mongoose = require("mongoose");

var TechniqueSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  variation: String,
  type: String,
  counters: [],
  nextSteps: [],
  notes: String,
  updated_at: { type: Date, default: Date.now }
});

TechniqueSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Technique", TechniqueSchema);
