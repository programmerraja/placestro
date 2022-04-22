var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { String,Number,ObjectId } = mongoose.Schema.Types;

const AdminSchema = new mongoose.Schema(
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
    adminType:{
      type:String,
      required:true
    }
    // SUPER_ADMIN,ADMIN,VIEWER
  },
  { timestamps: true }
);

AdminSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
AdminSchema.pre("save", function (next) {
  if (!this.password) {
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

module.exports = Admin;

// Admin.create({name:"Boopathi",email:"boooathis123@gmail.com",password:"boooathis123@gmail.com",department:"CSE",adminType:"SUPER_ADMIN"}).then((a)=>{console.log(a,"saved")})