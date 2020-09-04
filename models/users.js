var mongoose = require("mongoose");
var moment = require("moment");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_name: { type: String, required: true, max: 100 }
  //   date_of_birth: { type: Date },
  //   date_of_death: { type: Date }
});

// Virtual for User's full name
UserSchema.virtual("name").get(function() {
  // To avoid errors in cases where an User does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case

  var name = "";

  if (!this.user_name) {
    fullname = "no name";
  }

  return name;
});
// UserSchema.virtual("date_of_birth_formatted").get(function() {
//   return this.date_of_birth
//     ? moment(this.date_of_birth).format("MMMM DD, YYYY")
//     : "n/a";
// });

// UserSchema.virtual("date_of_death_formatted").get(function() {
//   return this.date_of_death
//     ? moment(this.date_of_birth).format("MMMM DD, YYYY")
//     : "n/a";
// });

// // Virtual for formatted date for forms
// UserSchema.virtual("date_of_birth_form_formatted").get(function() {
//   return this.date_of_birth
//     ? moment(this.date_of_birth).format("YYYY-MM-DD")
//     : "n/a";
// });

// UserSchema.virtual("date_of_death_form_formatted").get(function() {
//   return this.date_of_death
//     ? moment(this.date_of_birth).format("YYYY-MM-DD")
//     : "n/a";
// });

// Virtual for User's lifespan
// UserSchema.virtual("lifespan").get(function() {
//   let result = "";
//   if (this.date_of_birth) {
//     result += moment(this.date_of_birth).format("MMMM Do, YYYY") + " - ";
//   } else {
//     result += "n/a";
//   }
//   if (this.date_of_death) {
//     result += moment(this.date_of_death).format("MMMM Do, YYYY");
//   } else {
//     result += "n/a";
//   }
//   return result;
// });

// Virtual for User's URL
// UserSchema.virtual("url").get(function() {
//   return "/catalog/User/" + this._id;
// });

//Export model
module.exports = mongoose.model("User", UserSchema);
