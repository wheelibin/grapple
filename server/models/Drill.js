var mongoose = require("mongoose");

var DrillSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  steps: [
    {
      techniqueId: mongoose.Schema.Types.ObjectId,
      isOpponent: Boolean
    }
  ],
  notes: String,
  updated_at: { type: Date, default: Date.now }
});

DrillSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Drill", DrillSchema);
