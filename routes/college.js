const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController.js");


router.get("/list",collegeController.getCollegeList);


module.exports = router;
