const mongoose = require("mongoose");

const db = require("../models");
const Util= require("../util/util");

const Review = {
  getReviews: function (req, res) {
    if (req.params.companyId) {
      let match={ companyId: mongoose.Types.ObjectId(req.params.companyId) };
      let lookup = {from: "users",localField: "userId",foreignField: "_id",as: "user"};  
      
      db.Reviews
      .aggregate([{$match: match},{ $lookup: lookup }])
      .then(async (reviews) => {
          //appending company data to first one
          let company = await db.Companies.findOne({
            _id: req.params.companyId,
          });
          reviews[0]["company"] = { ...company._doc };
         
          db.Colleges
           .find({})
           .then((college_list) => {
              let hash_college_list={}
              //college name that are in this review
              let filtered_college_list=[]

              //storing college id with name 
              college_list.forEach((college)=>{
                  hash_college_list[college._id]=college.name
              })
              //removing user detail if it is Anonymous and put as obj and adding college name
              reviews.forEach((review) => {
                if(hash_college_list[review.user[0].collegeId]){
                  filtered_college_list.push(
                      {_id:review.user[0].collegeId,
                      name:hash_college_list[review.user[0].collegeId]
                    })
                    hash_college_list[review.user[0].collegeId]=null
                }
                if (review.isAnonymous) {
                  review.user = { name: "anonymous", dept: "" ,isLiked:review.likes.includes(req.user.id)};
                } else {
                  review.user = {
                    id:review.user[0]._id,
                    name: review.user[0].name,
                    department: review.user[0].department,
                    linkdein:review.user[0].linkdein,
                    college_name:hash_college_list[review.user[0].collegeId],
                    isLiked:review.likes.includes(req.user.id)
                  };
                }
              });
              res.json({ status: "sucess", reviews,college_list:filtered_college_list});
           })
           .catch((err)=>{
            console.log(err)
              res.json({ status: "failed", msg: "Something went wrong" });
           })
          Util.sendReport(
            `some one looking for reviews for the company ${reviews[0]["company"]["name"]}`,
            true,
            req
          );
      })
      .catch((err) => {
          console.log(err);
          res.json({ status: "failed", msg: "Something went wrong" });
      });
    }
  },

  getSortedReviews: function (req, res) {
    if(req.params.companyId){

        let company_match={$match:{companyId: mongoose.Types.ObjectId(req.params.companyId)}};
        let user_lookup = {$lookup:{from: "users",localField: "userId",foreignField: "_id",as: "user"}};
        
        let sort=null,college_match=null;
       
        let pipelines=[company_match,user_lookup];
        
        //if user use sort by
        if (req.query.sortBy && req.query.type) {
          sort={ [req.query.sortBy]: parseInt(req.query.type)};
        }
        //if user filter by college
        if(req.query.collegeId){
            college_match={"user.collegeId":mongoose.Types.ObjectId(req.query.collegeId)}
            pipelines.push({$match:college_match});
        }
        if(sort){
            pipelines.push({$sort:sort});
        }
        db.Reviews
          .aggregate(pipelines)
          .then((reviews) => {
              //removing user detail if it is Anonymous and put as obj
              reviews.forEach((review) => {
                if (review.isAnonymous) {
                  review.user = { name: "anonymous", dept: "" ,isLiked:review.likes.includes(req.user.id)};
                } else {
                  review.user = {
                    name: review.user[0].name,
                    department: review.user[0].department,
                    linkdein:review.user[0].linkdein,
                    isLiked:review.likes.includes(req.user.id)
                  };
                }
              });
              res.json({ status: "sucess", reviews: reviews});
        })
        .catch((err) => {
              console.log(err);
              res.json({ status: "failed", msg: "Something went wrong" });
        });
    }
  },
};

module.exports = Review;
