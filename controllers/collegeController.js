const db = require("../models");

const College = {
  getCollegeList: function (req, res) {
    db.Colleges.find({})
      .then((list) => {
        res.json({ status: "sucess", list: list });
      })
      .catch((err) => {
        res.json({ status: "failed", msg: "Something went wrong" });
      });
  },
};

module.exports = College;
