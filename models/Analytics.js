var mongoose = require("mongoose");
const { String,Number} = mongoose.Schema.Types;

const AnalyticsSchema = new mongoose.Schema(
  {
    year:{
        type:Number,
        unique: true,
    },
    placedCount:{
        type:Number
    },
    totalStudent:{
      type:Number
    },
    department:{
      type:Object
    },
    companies:{
        type:Array
    }
  },
);



const Analytics = mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema);

module.exports = Analytics;