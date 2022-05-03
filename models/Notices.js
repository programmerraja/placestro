var mongoose = require("mongoose");
const { String,Number} = mongoose.Schema.Types;

const NoticesSchema = new mongoose.Schema(
  {
    info:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    postedBy:{
        type:String
    },
  },
  { timestamps: true }
);



const Notices = mongoose.models.Notices || mongoose.model("Notices", NoticesSchema);

module.exports = Notices;