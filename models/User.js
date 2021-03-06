var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { String,Number,ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required:true
    },
    department:{
      type: String,
      required:true
    },
    marks:{
      type: Object,
      default:{SSLC:"",HSSLC:"",sem1:"",sem2:"",sem3:"",sem4:"",sem5:"",sem6:"",sem7:"",sem8:""}
    },
    cgpa:{
      type:Number
    },
    noOfArrear:{
      type:Number
    },
    historyOfArrear:{
      type:Number
    },
    project:{
      type:Array
    },
    passedOut:{
      type:Number
    },
    currentYear:{
      type:Number
    },
    linkdein:{
      type:String
    },
    mobileNo:{
      type:Number
    },
    isPlaced:{
      type:Boolean,
      default:false
    },
    placedCompany:{
      type:String
    },
    companyId:{
      type: ObjectId,
      ref: "Compaines",
    },
    isEmailVerified:{
      type:Boolean,
      default:false
    }, 
    passwordResetToken:{
      type:String
    },
    passwordResetExpires:{
      type:Date
    }
  },
  { timestamps: true }
);

UserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
UserSchema.pre("save", function (next) {
  if (!this.password) {
    // console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    // console.log("models/user.js hashPassword in pre save");
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
