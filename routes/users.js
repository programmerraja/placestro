const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const auth = require("../middleware/auth.js");
const checkMailVerified = require("../middleware/checkMailVerified.js");

const sanitizeHtml = require("../middleware/sanitizeHtml.js");

router.post("/signin",
			userController.signIn);

router.post("/signup",
			userController.signUp);

router.get("/verifiyEmail/:userId",
			userController.verifiyEmail);

router.get("/getProfile",
			auth.isAuthenticatedUser(),
			userController.getProfile);

router.post("/updateProfile",
			auth.isAuthenticatedUser(),
			userController.updateProfile);

router.post("/forgetPassword",
			userController.forgetPassword);

router.post("/resetPassword",
			userController.resetPassword);


router.get("/companyNames",
			userController.getCompanyList);

router.get("/getUserReviews",
			auth.isAuthenticatedUser(),
			userController.getUserReviews);

router.get("/getUserReview/:reviewId",
			auth.isAuthenticatedUser(),
			userController.getUserReview);

router.get("/likeTheReview/:reviewId",
			auth.isAuthenticatedUser(),
			checkMailVerified,
			userController.likeTheReview);


router.post("/addReview",
			auth.isAuthenticatedUser(),checkMailVerified,
			userController.addReview);

router.post("/updateReview",
			auth.isAuthenticatedUser(),checkMailVerified,
			userController.updateReview);

router.get("/deleteReview/:reviewId",
			auth.isAuthenticatedUser(),
			userController.deleteReview);


router.get("/getQuestion/",
			auth.isAuthenticatedUser(),
			userController.getQuestion);


router.post("/submitAnswer/",
			auth.isAuthenticatedUser(),
			userController.submitAnswer);

router.get("/getNotice",
			auth.isAuthenticatedUser(),
			userController.getNotice)

module.exports = router;
