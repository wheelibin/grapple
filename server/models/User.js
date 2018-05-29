var mongoose = require("mongoose");
const findOrCreate = require("mongoose-find-or-create");

var UserSchema = new mongoose.Schema({
  name: String,
  userid: String,
  updated_at: { type: Date, default: Date.now }
});
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
