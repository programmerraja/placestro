const router = require("express").Router();

const users = require("./users");
const company = require("./company");
// const college = require("./college");
const admin = require("./admin");

require("dotenv").config();

router.use("/user", users);
router.use("/company", company);
// router.use("/college", college);
router.use("/admin", admin);







module.exports = router;
