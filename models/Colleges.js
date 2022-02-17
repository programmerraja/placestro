var mongoose = require("mongoose");
const { String,Number } = mongoose.Schema.Types;

const CollegesSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      unique:true
    },
    code:{
      type:Number,
      required:true,
      unique:true
    }
  },
);


const Colleges = mongoose.models.Colleges || mongoose.model("Colleges", CollegesSchema);

module.exports = Colleges;
