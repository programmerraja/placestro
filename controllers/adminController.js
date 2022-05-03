const db = require("../models");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var validator = require("validator");
const passport = require("passport");

const {
  verfiyMail,
  dbErrorHandler,
  logError,
  generateToken,
  sendPasswordReset,
  sendReport,
  sendMail
} = require("../util/util");

const controllerUtil = require("../util/controllerUtil");
const company = require("./companyController");
const { copy } = require("../routes/admin");

const admin = {
  signIn: function (req, res, next) {
    return passport.authenticate(
      "admin_local",
      { session: false },
      (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            status: "failed",
            msg: info ? info.message : "Login failed",
          });
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.status(500).json({ status: "failed", msg: err });
          }
          //filtering user id and email for payload and setting exp time as 7 day
          let payload = JSON.stringify({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin:true,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          });
          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign(payload, process.env.JWT_KEY);
          return res.json({ status: "sucess", token });
          sendReport(`new Admin login ${user.name}`);
        });
      }
    )(req, res);
  },
  getCompanyData:function(req,res){
    if(req.params.companyId){
      db.Companies.findOne({_id:req.params.companyId})
      .then((company)=>{
        res.json({
          status: "sucess",
          company:company
        });
      })
      .catch((err)=>{
        res
        .send(500)
        .json({
          status: "failure",
          message: "Some Error Occured. Try Again!",
        });
      })
    }
  },
  updateCompanyData:function(req,res){
    if(req.params.companyId && req.body.company_name && req.body.company_rating && req.body.company_reviews && req.body.company_placed_count){
      let body={name:req.body.company_name,
                rating:req.body.company_rating,
                reviews:req.body.company_reviews,
                placedCount:req.body.company_placed_count}
                
      db.Companies.findOneAndUpdate({_id:req.params.companyId},{body})
      .then((company)=>{
        res.json({
          status: "sucess",
          msg:"Sucessfully updated"
        });
      })
      .catch((err)=>{
        res
        .send(500)
        .json({
          status: "failure",
          message: "Some Error Occured. Try Again!",
        });
      })
    }else{
      res
        .send(500)
        .json({
          status: "failure",
          message: "Some Error Occured. Try Again!",
        });
    }
  },

  getCounts: function (req, res) {
    db.User.countDocuments({})
      .then((user_count) => {
        db.Companies.countDocuments({})
          .then((company_count) => {
            db.Reviews.countDocuments({})
              .then((review_count) => {
                db.User.countDocuments({isPlaced:true})
                 .then((placed_count) => {
                        res.json({
                          status: "sucess",
                          user_count,
                          company_count,
                          review_count,
                          placed_count
                        });
                })
              })
              .catch((err) => {
                res
                  .send(500)
                  .json({
                    status: "failure",
                    message: "Some Error Occured. Try Again!",
                  });
              });
          })
          .catch((err) => {
            res
              .send(500)
              .json({
                status: "failure",
                message: "Some Error Occured. Try Again!",
              });
          });
      })
      .catch((err) => {
        res
          .send(500)
          .json({
            status: "failure",
            message: "Some Error Occured. Try Again!",
          });
      });
  },
  getAllUsers: function (req, res) {
    let limit = Number(req.query.limit) || 10;
    let skip = req.query.page > 1 ? Number((req.query.page - 1) * limit) : 0;

    let lookup = {from: "reviews",localField: "_id",foreignField: "userId",as: "reviews"};  

    // let group=  {_id:"$reviews","numOfReviews":{$sum:1},user:{ "$push": "$$ROOT" }}
    let group={ $addFields: {numOfReviews: {$size: "$reviews"}}}
    let match={}
    req.query.department ? match["department"]=req.query.department:null;
    req.query.passedout ? match["passedOut"]=Number(req.query.passedout):null;
    req.query.companyId ? match["companyId"]=mongoose.Types.ObjectId(req.query.companyId):null;
    req.query.companyId && req.query.passedout ? match={...match,"passedOut":Number(req.query.passedout),isPlaced:true} :null;
    db.User.aggregate([{$match:match},{ $lookup: lookup },group,{$unset:"reviews"}])
      .skip(skip)
      .limit(limit)
      .then((users) => {
        db.User.countDocuments(match)
          .then((count) => {
            res.json({
              users: users,
              count: count,
            });
          })
          .catch((err) => {
            console.log(err);
            res
              .send(500)
              .json({
                status: "failure",
                message: "Some Error Occured. Try Again!",
              });
          });
      })
      .catch((err) => {
        console.log(err);
        res.send(500).json({
          status: "failure",
          message: "Some Error Occured. Try Again!",
        });
      });
  },  
  getUserProfile:function(req,res){
    db.User.findOne({_id:req.params.userId})
    .then((user)=>{
      db.Companies.find({}).then((company)=>{

        res.json({status:"sucess",user:user,company})
      })
    })
  },
  updateUserProfile:function(req,res){
    db.User.findOneAndUpdate({_id:req.body.userId},req.body)
    .then((user)=>{
      res.json({status:"sucess",msg:"Sucessfully updated the user"})
    })
  },
  updateUserReview: function (req, res) {
    if (controllerUtil.checkReview(req.body)) {
      db.Companies.findOne({ name: req.body.name.toLowerCase() })
        .then((companyObj) => {
          //if company exist in our db use the company id
          if (companyObj) {
            let new_review = controllerUtil.createNewReview(req.body);
            db.Reviews.findOneAndUpdate(
              { _id: req.body.id },
              { ...new_review }
            )
              .then((reviewObj) => {
                res.json({
                  status: "sucess",
                  msg: "sucessfully updated your review",
                });

                let msg = `review updated  for ${companyObj.name} by ${req.user.name} \n`;
                Object.keys(reviewObj["_doc"]).forEach((key) => {
                  if (key === "roundsDetails") {
                    Object.keys(reviewObj["_doc"][key]).forEach((key2) => {
                      msg += `${key2} : ${reviewObj["_doc"][key][key2]}\n`;
                    });
                  }
                  if (key != "_id") {
                    msg += `${key} : ${reviewObj["_doc"][key]}\n`;
                  }
                });
                sendReport(msg);

                //if old rating not equal to new rating then update the rating
                if (req.body.old_rating != req.body.rating) {
                  db.Companies.findOneAndUpdate(
                    {
                      _id: companyObj._id,
                    },
                    {
                      rating:
                        Number(companyObj.rating) -
                        Number(req.body.old_rating) +
                        Number(req.body.rating),
                    }
                  ).then((a) => {});
                }
              })
              .catch((err) => {
                logError(err.msg, err);
                res.json({
                  status: "failed",
                  msg: "Sorry Something went wrong. Please try again",
                });
              });
          }
          //create new company then use the id
          else {
            //if user change company send dont change company name
            return res.json({
              status: "failed",
              msg: "Sorry You are not allowed to change company name if you like delete the review and add new review",
            });
          }
        })
        .catch((err) => {
          logError(err.msg, err);
          res.json({
            status: "failed",
            msg: "Sorry Something went wrong. Please try again",
          });
        });
    } else {
      res.json({ status: "failed", msg: "Please fill all the data" });
    }
  },    
  deleteUserReview: function (req, res) {
    if (req.params.reviewId) {
      db.Reviews.findOneAndRemove({ _id: req.params.reviewId })
        .then((reviewObj) => {
          res.json({
            status: "sucess",
            msg: "sucessfully deleted your review",
          });
          db.Companies.findOne({ _id: reviewObj.companyId }).then(
            (companyObj) => {
              if (companyObj) {
                sendReport(
                  `new review deleted for ${companyObj.name} by admin`
                );
                let new_rating = companyObj.rating - reviewObj.rating;
                db.Companies.findOneAndUpdate(
                  { _id: companyObj._id },
                  { $inc: { noOfReviews: -1 }, rating: new_rating }
                ).then((a) => {});
              }
            }
          );
        })
        .catch((err) => {
          logError(err.msg, err);
          res.json({
            status: "failed",
            msg: "Sorry Something went wrong. Please try again",
          });
        });
    } else {
      res.json({ status: "failed", msg: "Review id missing" });
    }
  },
  deleteUser: function (req, res) {
    db.User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        res.json({ status: "sucess", msg: "sucessfully deleted the user" });
      })
      .catch((err) => {
        logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
      });
  },
  getCompanyList: function (req, res) {
    let lookup=
    db.Companies.find({})
      .then((list) => {
        let new_list = [];
        list.forEach((obj) => {
          new_list.push(obj.name);
        });
        res.json({ status: "sucess", list: new_list });
      })
      .catch((err) => {
        res.json({ status: "failed", list: [] });
      });
  },
  deleteUserReview: function (req, res) {
    if (req.params.reviewId) {
      db.Reviews.findOneAndRemove({ _id: req.params.reviewId })
        .then((reviewObj) => {
          res.json({
            status: "sucess",
            msg: "sucessfully deleted your review",
          });
          db.Companies.findOne({ _id: reviewObj.companyId }).then(
            (companyObj) => {
              if (companyObj) {
                sendReport(
                  `new review deleted for ${companyObj.name} by admin`
                );

                let new_rating = companyObj.rating - reviewObj.rating;
                db.Companies.findOneAndUpdate(
                  { _id: companyObj._id },
                  { $inc: { noOfReviews: -1 }, rating: new_rating }
                ).then((a) => {});
              }
            }
          );
        })
        .catch((err) => {
          logError(err.msg, err);
          res.json({
            status: "failed",
            msg: "Sorry Something went wrong. Please try again",
          });
        });
    } else {
      res.json({ status: "failed", msg: "Review id missing" });
    }
  },
  getUserReviews: function (req, res) {
    let match={ userId: mongoose.Types.ObjectId(req.params.userId) };
    let lookup = {from: "companies",localField: "companyId",foreignField: "_id",as: "company"};  
    let lookup2 = {from: "users",localField: "userId",foreignField: "_id",as: "user"};  
      
    db.Reviews
      .aggregate([{$match: match},{ $lookup: lookup },{ $lookup: lookup2 }])
      .then(async (reviews) => {
        res.json({ status: "success", reviews: reviews });
      })
      .catch((err) => {
        console.log(err)
        res.json({ status: "failed", msg: "Something went wrong" });
      });
  },
  getUserReview: function (req, res) {
    db.Reviews.findOne({ _id: req.params.reviewId })
      .then((review) => {
        db.Companies.findOne({ _id: review.companyId })
          .then((company) => {
            if (company) {
              review._doc.name = company.name;
              res.json({ status: "sucess", review: review });
            } else {
              res.json({ status: "failed", msg: "Something went wrong" });
            }
          })
          .catch((err) => {
            res.json({ status: "failed", msg: "Something went wrong" });
          });
      })
      .catch((err) => {
        res.json({ status: "failed", msg: "Something went wrong" });
      });
  },
  verifiyMyEmail: async function (req, res) {
    let user_id = req.params.userId;
    if (user_id) {
      var user = await db.User.findOne({
        _id: user_id,
      });
      if (user) {
        user.is_email_verified = true;
        new_user = await user.save();
        res.json({ status: "sucess" });
        return;
      }
      res.json({ status: "failed" });
    }
  },
  deleteCompany: function (req, res) {
    if (req.params.companyId) {
      db.Companies.findOneAndRemove({ _id: req.params.companyId })
        .then((companyObj) => {
          res.json({ status: "sucess", msg: "sucessfully deleted company" });
          db.Reviews.findOneAndRemove({ companyId: companyObj._id }).then(
            (reviewObj) => {
              if (companyObj) {
                sendReport(
                  `new company deleted for ${companyObj.name} by admin`
                );
              }
            }
          );
        })
        .catch((err) => {
          logError(err.msg, err);
          res.json({
            status: "failed",
            msg: "Sorry Something went wrong. Please try again",
          });
        });
    } else {
      res.json({ status: "failed", msg: "company id missing" });
    }
  },
  generateAnalytics:function(req,res){
    if(req.params.year>=2018 && req.params.year<=2022){
      let year=req.params.year;
      let placedCount;
      let companies={}
      let department={}
      let totalStudent;

      db.User.find({passedOut:year,isPlaced:true})
      .then((user)=>{
        placedCount=user.length;
        user.map((user)=>
        {
          companies[user.placedCompany] ? companies[user.placedCompany]+=1 : companies[user.placedCompany]=1
        });
        user.map((user)=>{
          if(department[user.department]!=undefined){
            department[user.department]+=1;
          }else{
            department[user.department]=1;
          }
        })
      
        db.User.aggregate([{$match:{passedOut:Number(year)}},{"$group" : {_id:"$department", count:{$sum:1}}}])
        .then((users)=>{
          console.log(users)
          totalStudent=0;
          departmentStudents={}
          users.forEach(user=>{
            totalStudent+=user.count;
            departmentStudents[user._id]=user.count;
          })
          console.log(departmentStudents,companies)
          db.Analytics.findOne({year}).then((an)=>{
            if(!an){
              db.Analytics.create({year,placedCount,department,totalStudent,companies,departmentStudents})
              .then((a)=>{})
            }else{
              // console.log(an)
              db.Analytics.findOneAndUpdate({year},{placedCount,department,totalStudent,companies,departmentStudents})
              .then((a)=>{})
            }
          })
          res.json({ status: "sucess", msg:"Sucessfully created" });
        })
      })
      .catch((err) => {
        logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
      });
    }else{
      res.json({ status: "sucess", msg:"Enter the valid year" });
    }
  },
  getAnalytics:function(req,res){
    db.Analytics.find({})
    .then((analytics) => {
      res.json({ status: "sucess", data:analytics });
    })
    .catch((err) => {
      logError(err.msg, err);
      res.json({
        status: "failed",
        msg: "Sorry Something went wrong. Please try again",
      });
    });
  },
  updateAnalytic:function(req,res){
    db.Analytics.findOneAndUpdate({_id:req.body.id},req.body)
    .then(admin=>{
      console.log(admin,req.body)
      res.json({ status: "sucess", msg: "sucessfully updated the analytic" });
    })
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  getAllAdmins: function (req, res) {
    let limit = Number(req.query.limit) || 10;
    let skip = req.query.page > 1 ? Number((req.query.page - 1) * limit) : 0;
    let match={}
    req.query.department ? match["department"]=req.query.department:null;

    db.Admin.aggregate([{$match:match}])
      .skip(skip)
      .limit(limit)
      .then((admins) => {
        db.Admin.countDocuments(match)
          .then((count) => {
            res.json({
              admins: admins,
              count: count,
            });
          })
          .catch((err) => {
            console.log(err);
            res
              .send(500)
              .json({
                status: "failure",
                message: "Some Error Occured. Try Again!",
              });
          });
      })
      .catch((err) => {
        console.log(err);
        res.send(500).json({
          status: "failure",
          message: "Some Error Occured. Try Again!",
        });
      });
  },
  createAdmin:function(req,res){
    db.Admin.create(req.body)
    .then(admin=>{
      res.json({ status: "sucess", msg: "sucessfully created the admin" });
    })
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  updateAdmin:function(req,res){
    db.Admin.findOneAndUpdate({_id:req.body.id},req.body)
    .then(admin=>{
      res.json({ status: "sucess", msg: "sucessfully updated the admin" });
    })
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  deleteAdmin: function (req, res) {
    db.Admin.findOneAndRemove({ _id: req.params.userId })
      .then((user) => {
        res.json({ status: "sucess", msg: "sucessfully deleted the admin" });
      })
      .catch((err) => {
        logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
      });
  },
  createCompany:function(req,res){
    db.Companies.create(req.body)
    .then(admin=>{
      res.json({ status: "sucess", msg: "sucessfully created the company" });
    })
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  updateCompany:function(req,res){
    db.Companies.findOneAndUpdate({_id:req.body.id},req.body)
    .then(admin=>{
      res.json({ status: "sucess", msg: "sucessfully updated the company" });
    })
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  getCompanyAnalytics:function(req,res){
    db.Companies.findOne({_id:req.params.companyId})
    .then(company=>{
      console.log(company,req.params.companyId)
      res.json({ status: "sucess",analytics:company.analyticsYear});
    })
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  generateCompanyAnalytics:function(req,res){
      if(req.query.year>=2018 && req.query.year<=2022){
        let year=req.query.year;
        let placedCount;
        let analyticsDepartment={}
        let totalStudent;

        db.User.find({passedOut:year,isPlaced:true,companyId:req.query.companyId})
        .then((user)=>{
          user.map((user)=>{
            if(analyticsDepartment[user.department]!=undefined){
              analyticsDepartment[user.department]+=1;
            }else{
              analyticsDepartment[user.department]=1;
            }
          })
          analyticsYear={[year]:analyticsDepartment};
          db.Companies.findOne({_id:req.query.companyId})
          .then((company)=>{
              console.log(company)
              if(!company.analyticsYear){
                // console.log(analyticsYear,analyticsDepartment,"d")
                db.Companies.findOneAndUpdate({_id:req.query.companyId},{analyticsYear})
                .then(()=>{
                  res.json({ status: "sucess", msg:"Sucessfully created" });
                })
              }else{
                analyticsYear={...company.analyticsYear,...analyticsYear};
                analyticsDepartment={...company.analyticsDepartment,...analyticsDepartment};
                // console.log(analyticsYear,analyticsDepartment)
                db.Companies.findOneAndUpdate({_id:req.query.companyId},{analyticsYear})
                .then(()=>{
                  res.json({ status: "sucess", msg:"Sucessfully created" });
                })
              }
          
        })
        .catch((err) => {
          console.log(err)
          logError(err.msg, err);
          //  res.json({
          //   status: "failed",
          //   msg: "Sorry Something went wrong. Please try again",
          // });
        });
      });
      }else{
        // res.json({ status: "sucess", msg:"Enter the valid year" });
      }
  },
  getMails:function(req,res){
    // let user_fileds=["name","password","department","marks","cgpa","noOfArrear","historyOfArrear","project","passedOut","currentYear","linkdein","mobileNo","isPlaced","placedCompany","companyId","isEmailVerified","passwordResetToken","passwordResetExpires"]
    let query={}
    req.query.department && (req.query.department!=="all") ? query["department"]=req.query.department :null;
    req.query.currentYear && (req.query.currentYear!=="all")? query["currentYear"]=req.query.currentYear :null;
    console.log(query,req.params)
    db.User.find(query,"email")
    .then((users)=>{
      let mails=users.map(user=>user.email)
      res.json({ status: "sucess",mails });
    })
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  sendMails:function(req,res){
    let mails=req.body.mails;
    mails.forEach(mail=>{
      sendMail(req.body.subject,req.body.body,mail)
    })
  },
  getNotice:function(req,res){
    db.Notices.find()
    .then(notices=>{
      res.json({status:"sucess",notices:notices})
    }) 
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  createNotice:function(req,res){
    db.Notices.create({...req.body,postedBy:req.user.name})
    .then(notices=>{
      res.json({status:"sucess",msg:"Notice created Sucessfully"})
    }) 
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  updateNotice:function(req,res){
    let body={info:req.body.info}
    req.body.image? body["image"]=req.body.image:null
    db.Notices.findOneAndUpdate({_id:req.body._id},body)
    .then(notices=>{
      res.json({status:"sucess",msg:"Notice updated Sucessfully"})
    }) 
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },
  deleteNotice:function(req,res){
    console.log(req.params)
    db.Notices.findOneAndRemove({_id:req.params.noticeId})
    .then(notices=>{
      res.json({status:"sucess",msg:"Notice removed Sucessfully"})
    }) 
    .catch((err) => {
      logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
    });
  },

};

module.exports = admin;
