const express = require("express");
const admin = require("../controllers/adminController.js");
const router = express.Router();

const adminController = require("../controllers/adminController.js");
const companyController = require("../controllers/companyController.js");

const auth = require("../middleware/auth.js");

router.post("/user/signin",
			adminController.signIn);

router.get("/user/sortBy",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getAllUsers);

router.get("/company/list/",
			companyController.getCompanyList);

router.get("/company/:companyId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getCompanyData);

router.post("/company/:companyId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateCompanyData);

router.get("/user/getCounts",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getCounts);

router.get("/user/getUserReviews/:userId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getUserReviews);

router.get("/user/getUserReview/:reviewId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getUserReview);

router.get("/user/deleteUserReview/:reviewId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteUserReview);

router.post("/user/updateUserReview",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateUserReview);

router.get("/user/getAllUsers",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getAllUsers);

router.get("/user/getUserProfile/:userId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getUserProfile);
			

router.post("/user/updateUserProfile",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateUserProfile);
			
router.get("/user/deleteUser/:userId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteUser);


router.get("/user/generateAnalytics/:year",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.generateAnalytics);

router.get("/user/getAnalytics",
				auth.isAuthenticatedAdmin(),
				auth.isAdmin,
				adminController.getAnalytics);
				
router.post("/user/updateAnalytic",
				auth.isAuthenticatedAdmin(),
				auth.isAdmin,
				adminController.updateAnalytic);

router.post("/createAdmin",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.createAdmin);

router.post("/updateAdmin",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateAdmin);

router.get("/getAllAdmins",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getAllAdmins);

router.get("/deleteAdmin/:userId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteAdmin);

router.post("/createCompany/",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.createCompany)

router.post("/updateCompany/",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateCompany)

router.get("/deleteCompany/:companyId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteCompany);
module.exports = router;
