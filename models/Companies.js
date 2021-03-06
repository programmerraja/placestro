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
      default:0
    },
    noOfReviews:{
      type:Number
    },
    placedCount:{
      type:Number,
      default:0      
    },
    status:{
      type:String,
    },
    campusType:{
      type:String,
    },
    lastVisitedDate:{
      type:Date
    },
    upcomingDate:{
      type:Date
    },
    analyticsYear:{
      type:Object
    },
  },
);



const Companies = mongoose.models.Companies || mongoose.model("Companies", CompaniesSchema);

module.exports = Companies;
