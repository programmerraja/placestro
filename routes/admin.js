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


router.get("/company/generateAnalytics/",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.generateCompanyAnalytics);


router.get("/company/:companyId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getCompanyData);

router.post("/company/:companyId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateCompanyData);

router.get("/company/analytics/:companyId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getCompanyAnalytics);

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

router.get("/user/deleteReview/:reviewId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteReview);

router.post("/user/updateReview",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateReview);

router.get("/user/getAllUsers",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getAllUsers);

router.get("/user/getProfile/:userId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getProfile);
			

router.post("/user/updateProfile",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateProfile);
			
router.get("/user/deleteUser/:userId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteUser);


router.get("/user/generateAnalytics/:year",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.generateAnalytics);

router.get("/user/getAnalytics",
				// auth.isAuthenticatedAdmin(),
				// auth.isAdmin,
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

router.get("/getMails",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getMails)
			
router.post("/sendMails",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.sendMails)

router.get("/getNotice",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getNotice)

router.post("/createNotice",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.createNotice)

router.post("/updateNotice",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateNotice)

router.get("/deleteNotice/:noticeId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteNotice)

router.get("/user/getViews",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.getViews);

router.post("/user/createView",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.createView);

router.post("/user/updateView",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.updateView);
			
router.get("/user/deleteView/:viewId",
			auth.isAuthenticatedAdmin(),
			auth.isAdmin,
			adminController.deleteView)

router.get("/user/getViewUsers",
			adminController.getViewUsers);
module.exports = router;
