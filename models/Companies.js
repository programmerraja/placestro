var mongoose = require("mongoose");
const { String,Number} = mongoose.Schema.Types;

const CompaniesSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      unique:true
    },
    rating:{
      type:Number,
      required:true,
      default:0
    },
    noOfReviews:{
      type:Number
    },
    collegeIds:{
      type: [{type: String}]      
    }
  },
);



const Companies = mongoose.models.Companies || mongoose.model("Companies", CompaniesSchema);

module.exports = Companies;
