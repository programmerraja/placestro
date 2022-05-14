var mongoose = require("mongoose");
const { String,Number} = mongoose.Schema.Types;

const CompanyViewSchema = new mongoose.Schema(
  {
   passedOut:{
       type:Number
   },
   department:{
       type:String
   },
   name:{
       type:String
   },
   isViewed:{
       type:Number
   }
  },
);



const Companyview = mongoose.models.Companyview || mongoose.model("companyview", CompanyViewSchema);

module.exports = Companyview;
