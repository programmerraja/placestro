const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController.js");
const reviewController = require("../controllers/reviewController.js");

const auth = require("../middleware/auth.js");
const sanitizeHtml = require("../middleware/sanitizeHtml.js");

router.get("/getReviews/:companyId",auth.isAuthenticated(),
			reviewController.getReviews);

router.get("/sortedReviews/:companyId",auth.isAuthenticated(),
			reviewController.getSortedReviews);

router.get("/sortedList/",
			companyController.getSortedCompanyList);

router.get("/filteredList/",
			companyController.getFilteredCompanyList);

router.get("/list",
			companyController.getCompanyList);


module.exports = router;
