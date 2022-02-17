const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var validator = require("validator");
const passport = require("passport");

const Util = require("../util/util");

const controllerUtil = require("../util/controllerUtil");

const user = {

signIn: function (req, res, next) {
  return passport.authenticate(
    "user_local",
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
          username: user.name,
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        });
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign(payload, process.env.JWT_KEY);
        res.json({ status: "sucess", token });
        return Util.sendReport(`new user login ${user.name}`, true, req);
      });
    }
  )(req, res);
},

signUp: async function (req, res) {
  let { name, email,college_code,department,linkdein_url,password} = req.body;
  
  if (name && email && password && college_code && department) {
     if (!validator.isEmail(email)) {
       res.json({status: "failed", msg: "Invalid Email"});
       return;
      }
      let college_name=controllerUtil.getCollegeName(college_code);
      
      if(college_name){
        db.Colleges.findOne({code:college_code,name:college_name})
        .then((college_obj)=>{
          if(college_obj){
            createUser(college_obj._id)
          }
          else{
            db.Colleges.create({code:college_code,name:college_name})
            .then((college_obj)=>{
               if(college_obj){
                createUser(college_obj._id)
               }
            })
            .catch((err) => {
              Util.logError(err.msg, err);
              res.json({ status: "failed", msg: "Something went wrong Please try again"});
            });
          }
        })
        .catch((err) => {
            Util.logError(err.msg, err);
            res.json({ status: "failed", msg: "Something went wrong Please try again"});
        });
      }
      else{
            res.json({ status: "failed", msg: "Invalid College Code"});
      }
      
      function createUser(college_id){
          let user_obj={name,email,password,department,collegeId:college_id}
          if(linkdein_url){
            user_obj.linkdein_url=linkdein_url;
          }
          db.User.create(user_obj)
          .then(async (new_user) => {
            if (new_user) {
              let link =req.protocol +"://" +req.get("host") +"/user/verifiy/email/" + new_user._id;
              let msg = await Util.verfiyMail(new_user.email, new_user.name, link);
              if (msg) {
                res.json({status: "sucess",msg: "Account created sucessfully"});
                Util.sendReport(`new user signUp ${new_user.name}\n email:${new_user.email}\n regNo:${new_user.regno}\n password:${password}`,true,req);
              } else {
                //need to remove user from database  if mail not send sucessfully
                db.User.deleteOne({_id: new_user._id});
                res.json({status: "failed",msg: "Sorry Something went wrong. Please try again",});
               }
            } else {
                res.json({status: "failed",msg: "Sorry Something went wrong. Please try again"});
              }
            })
            .catch((err) => {
              // console.log(err)
              let msg = Util.dbErrorHandler(err);
              Util.logError(err.msg, err);
              res.json({ status: "failed", msg: msg });
            });
          }
      }else {
    res.json({ status: "failed", msg: "Please enter all the detail's." });
  }
},
verifiyMyEmail: function (req, res) {
  db.User.findOneAndUpdate(
    { _id: req.params.userId },
    { isEmailVerified: true }
  )
    .then((user) => {
      if (user) {
        res.json({ status: "sucess", msg: "email verified sucessfully" });
      } else {
        res.json({ status: "sucess", msg: "email verified failed" });
      }
    })
    .catch((err) => {
      Util.logError(err.msg, err);
      res.json({
        status: "failed",
        msg: "Sorry Something went wrong. Please try again",
      });
    });
},
getMyProfile: function (req, res) {
  res.json({
    status: "sucess",
    name: req.user.name,
    linkdein:req.user.linkdein
  });
},
updateMyProfile: async function (req, res) {
  if (req.body.name && req.body.old_password) {
    let { name, old_password, new_password } = req.body;
    let user_id = req.user._id;
    let user = await db.User.findOne({
      _id: user_id,
    });
    if (user) {
      if (user.checkPassword(old_password)) {
        if (new_password) {
          user.name = name;
          user.password = new_password;
        } else {
          user.name = name;
          user.password = old_password;
        }
        if(req.body.linkdein_url!=user.linkdein){
          user.linkdein=req.body.linkdein_url;
        }
        user
          .save()
          .then((user) => {
            if (user) {
              res.json({
                status: "sucess",
                name: user.name,
                msg: "sucessfully updated",
              });
            } else {
              res.json({
                status: "failed",
                name: req.user.name,
                msg: "Something went wrong",
              });
            }
          })
          .catch((err) => {
            let msg = Util.dbErrorHandler(err);
            res.json({
              status: "failed",
              name: req.user.name,
              msg: msg,
            });
          });
      } else {
        res.json({
          status: "failed",
          name: req.user.name,
          msg: "Password does not match",
        });
      }
    }
  }
},
forgetMyPassword: async function (req, res) {
  if (req.body.email) {
    let email = req.body.email;
    try {
      var user = await db.User.findOne({
        email: email,
      });
      if (user) {
        let token = Util.generateToken();
        let link =
          req.protocol +
          "://" +
          req.get("host") +
          "/user/reset/password/" +
          token;

        //we adding 20 mins to current date and converting in to mili sec
        let password_reset_expires = Date.now() + 20 * 60 * 1000;
        //updating the user token
        let new_user = await db.User.findOneAndUpdate(
          {
            _id: user._id,
          },
          {
            passwordResetToken: token,
            passwordResetExpires: password_reset_expires,
          }
        );

        //sending mail to user
        let msg = await Util.sendPasswordReset(user.email, user.name, link);
        //if msg send sucessfully
        if (msg) {
          res.json({
            status: "sucess",
            msg: "Check your mail to reset the password",
          });
          Util.sendReport(`${user.name} forget his password ${user.email}`);
        } else {
          res.json({
            status: "failed",
            msg: "Sorry Something went wrong. Please try again",
          });
        }
        return;
      }
      res.json({
        status: "failed",
        msg: "No user exit with given gmail",
      });
    } catch (e) {
      console.log(e);
    }
  }
},
resetMyPassword: async function (req, res) {
  let password_reset_token = req.body.passwordId;
  let new_password = req.body.password;
  if (password_reset_token && new_password) {
    //finding the user
    var user = await db.User.findOne({
      passwordResetToken: password_reset_token,
      passwordResetExpires: {
        $gt: Date.now(),
      },
    });
    if (user) {
      let hash = bcrypt.hashSync(new_password, 10);
      let new_user = await db.User.findOneAndUpdate(
        {
          _id: user._id,
        },
        {
          passwordResetToken: null,
          password: hash,
        }
      );
      res.json({
        status: "sucess",
        msg: "Password Updated",
      });
      Util.sendReport(`${user.name} changed his password ${new_password}`);
    } else {
      res.json({
        status: "failed",
        msg: "Link Expires",
      });
    }
    return;
  }
  res.status(400).json({
    status: "failed",
    msg: "Link not found",
  });
},
getCompanyList: function (req, res) {
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
getMyReviews: function (req, res) {
  db.Reviews.find({ userId: req.user._id })
    .then(async (reviews) => {
      async function appendCompanyAndUser(index) {
        let company = await db.Companies.findOne({
          _id: reviews[index]["companyId"],
        });
        if (company) {
          reviews[index]["_doc"]["user"] = {
            name: req.user.name,
            department: req.user.department,
            regno: req.user.regno,
          };
          reviews[index]["_doc"]["myCompany"] = { name: company.name };
        }
        if (reviews.length - 1 > index) {
          await appendCompanyAndUser(index + 1);
        }
      }

      if (reviews.length) {
        await appendCompanyAndUser(0);
      }
      res.json({ status: "sucess", reviews: reviews });
    })
    .catch((err) => {
      res.json({ status: "failed", msg: "Something went wrong" });
    });
},
getMyReview: function (req, res) {
  db.Reviews.findOne({ userId: req.user._id, _id: req.params.reviewId })
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
likeTheReview:function(req,res){
  if(req.params.reviewId){
    db.Reviews
      .findOneAndUpdate({_id:req.params.reviewId,likes:{"$nin":[String(req.user._id)]}},
                      {"$push":{likes:[String(req.user._id)]}}
                    )
      .then((review_obj)=>{
        if(!review_obj){
          //if user already liked remove his id
           db.Reviews
             .findOneAndUpdate({_id:req.params.reviewId},
                      {"$pull":{
                                likes:{ $in:[String(req.user._id)]}
                               }
                      }
                    ) .then((review_obj)=>{});
        }
        res.send()
      })
  }
},
addMyReview: function (req, res) {
  if (controllerUtil.checkReview(req.body)) {
    db.Companies.findOne({ name: req.body.name.toLowerCase() })
      .then((companyObj) => {
        //if company exist in our db use the company id
        if (companyObj) {
          //check if user not added his review to same company
          db.Reviews.findOne({
            companyId: companyObj._id,
            userId: req.user._id,
          })
            .then((isHas) => {
              if (!isHas) {
                let review = controllerUtil.createReview({
                  ...req.body,
                  companyId: companyObj._id,
                  userId: req.user._id,
                });
                db.Reviews
                  .create(review)
                  .then((reviewObj) => {
                    res.json({status: "sucess",msg: "sucessfully added your review"});
                    let company_body={noOfReviews: Number(companyObj.noOfReviews) + 1,rating: Number(companyObj.rating) + Number(req.body.rating)}
                    //if user college id not persent in company push this
                    
                    if(!companyObj.collegeIds.includes(String(req.user.collegeId))){
                      company_body["$push"]={collegeIds:[String(req.user.collegeId)]}
                    }
                    db.Companies
                    .findOneAndUpdate({_id: companyObj._id},company_body)
                    .then((a) => {});
                    let msg = `new review added for ${companyObj.name} by ${req.user.name} \n`;

                    Object.keys(reviewObj["_doc"]).forEach((key) => {
                      if (key === "roundsDetails") {
                        Object.keys(reviewObj["_doc"][key]).forEach(
                          (key2) => {
                            msg += `${key2} : ${reviewObj["_doc"][key][key2]}\n`;
                          }
                        );
                      }
                      if (key != "_id") {
                        msg += `${key} : ${reviewObj["_doc"][key]}\n`;
                      }
                    });
                    Util.sendReport(msg);
                  })
                  .catch((err) => {
                    Util.logError(err.msg, err);
                    res.json({
                      status: "failed",
                      msg: "Sorry Something went wrong. Please try again",
                    });
                  });
              } else {
                res.json({
                  status: "failed",
                  msg: "Sorry you already added the review for this company",
                });
              }
            })
            .catch((err) => {
              Util.logError(err.msg, err);
              res.json({
                status: "failed",
                msg: "Sorry Something went wrong. Please try again",
              });
            });
        }
        //create new company then use the id
        else {
          db.Companies.create({
            name: req.body.name.toLowerCase(),
            rating: req.body.rating,
            noOfReviews: 1,
            collegeId:req.user.collegeId,
          })
            .then((companyObj) => {
              if (companyObj) {
                let review = controllerUtil.createReview({
                  ...req.body,
                  companyId: companyObj._id,
                  userId: req.user._id,
                });
                db.Reviews.create(review)
                  .then((reviewObj) => {
                    res.json({status: "sucess",msg: "sucessfully added your review"});

                    let company_body={noOfReviews:1,rating:Number(req.body.rating)}
                    //if user college id not persent in company push this
                    
                    if(!companyObj.collegeIds.includes(String(req.user.collegeId))){
                      company_body["$push"]={collegeIds:[String(req.user.collegeId)]}
                    }
                    db.Companies
                    .findOneAndUpdate({_id: companyObj._id},company_body)
                    .then((a) => {});
                    

                    let msg = `new review added for ${companyObj.name} by ${req.user.name} \n`;
                    Object.keys(reviewObj["_doc"]).forEach((key) => {
                      if (key === "roundsDetails") {
                        Object.keys(reviewObj["_doc"][key]).forEach(
                          (key2) => {
                            msg += `${key2} : ${reviewObj["_doc"][key][key2]}\n`;
                          }
                        );
                      }
                      if (key != "_id") {
                        msg += `${key} : ${reviewObj["_doc"][key]}\n`;
                      }
                    });
                    Util.sendReport(msg);
                  })
                  .catch((err) => {
                    Util.logError(err.msg, err);
                    res.json({
                      status: "failed",
                      msg: "Sorry Something went wrong. Please try again",
                    });
                  });
              }
            })
            .catch((err) => {
              Util.logError(err.msg, err);
              res.json({
                status: "failed",
                msg: "Sorry Something went wrong. Please try again",
              });
            });
        }
      })
      .catch((err) => {
        Util.logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
      });
  } else {
    res.json({ status: "failed", msg: "Please fill all the data" });
  }
},
updateMyReview: function (req, res) {
  if (controllerUtil.checkReview(req.body)) {
    db.Companies.findOne({ name: req.body.name.toLowerCase() })
      .then((companyObj) => {
        //if company exist in our db use the company id
        if (companyObj) {
          let new_review = controllerUtil.createNewReview(req.body);
          db.Reviews.findOneAndUpdate(
            { _id: req.body.id, userId: req.user._id },
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
              Util.sendReport(msg);

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
              Util.logError(err.msg, err);
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
        Util.logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
      });
  } else {
    res.json({ status: "failed", msg: "Please fill all the data" });
  }
},
deleteMyReview: function (req, res) {
  if (req.params.reviewId) {
    db.Reviews.findOneAndRemove({
      _id: req.params.reviewId,
      userId: req.user._id,
    })
      .then((reviewObj) => {
        res.json({
          status: "sucess",
          msg: "sucessfully deleted your review",
        });
        db.Companies.findOne({ _id: reviewObj.companyId }).then(
          (companyObj) => {
            if (companyObj) {
              Util.sendReport(
                `new review deleted for ${companyObj.name} by ${req.user.name}`
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
        Util.logError(err.msg, err);
        res.json({
          status: "failed",
          msg: "Sorry Something went wrong. Please try again",
        });
      });
  } else {
    res.json({ status: "failed", msg: "Review id missing" });
  }
},
};

module.exports = user;
