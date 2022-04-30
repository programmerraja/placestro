const db = require("../models");

const Util = require("../util/util");

const company = {
  getCompanyList: function (req, res) {
    db.Companies.find({})
      .then((company_list) => {
            let t=company_list[1];
            company_list[1]=company_list[15];
            company_list[15]=t
            let list={company_list}
            res.json({ status: "sucess", list: list });
      })
      .catch((err) => {
        res.json({ status: "failed", msg: "Something went wrong" });
      });
  },
  getSortedCompanyList: function (req, res) {
    let query={},sort={}
    console.log(req.query)   
    if(req.query.type==="status"){
      query["status"]=req.query.sortBy;
    }
    if (req.query.sortBy && req.query.type && req.query.type!="status") {
      sort={ [req.query.sortBy]: req.query.type }
    }
    
    console.log(query,"query",sort)
    db.Companies.find(query)
      .sort(sort)
      .then((company_list) => {
          res.json({ status: "sucess", list: company_list });
       })
      .catch((err) => {
          res.json({ status: "failed", msg: "Something went wrong" });
      });
  },
  getFilteredCompanyList: function(req,res){
    if (req.query.collegeId) {
      let query={}
      if(req.query.sortBy && req.query.type){
        query[req.query.sortBy]= req.query.type
      }
      db.Companies
       .find({collegeIds:{"$in":[String(req.query.collegeId)]}})
       .sort(query)
       .then((company_list) => {
              res.json({ status: "sucess", list: company_list });
       })
       .catch((err) => {
          console.log(err)
          res.json({ status: "failed", msg: "Something went wrong" });
        });
    }
  }
};

module.exports = company;
