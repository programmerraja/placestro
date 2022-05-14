import axios from "axios";
import jwt_decode from "jwt-decode";

import userService from "./userService";
import adminService from "./adminService";

import companyService from "./companyService";


export default {
  setToken:function (token) {
     localStorage.setItem("token",token);
  },
  isAuth:function(){
    let token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  },
  setAuthHeader: function () {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  },
  removeAuthHeader: function () {
    axios.defaults.headers.common["Authorization"] = "";
  },
  checkTokenExp: function () {
    let token = localStorage.getItem("token");
    //check only if token avalible and checking it is valid token 
    //if it valid token if we split according to dot the array length will greater then or =2
    if (token && token.split(".").length>=2)  {
      var decoded = jwt_decode(token);
      let currentDate = new Date();
      // JWT exp is in seconds
      if (decoded.exp * 1000 < currentDate.getTime() ||  decoded.isAdmin===undefined) {
        //removing user data from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return true;
      }
    }else{
      //token not valid mean it expired so true
      return true;
    }
    return false;
  },
  decodedUserJWT: function () {
    let token = localStorage.getItem("token");
    //check only if token avalible
    if (token  && token.split(".").length>=2) {
      var decoded = jwt_decode(token);
      let user = decoded;
      return user;
    }
    return null;
  },

  getCounts:userService.getCounts,
  signIn:userService.signIn,
  signUp:userService.signUp,
  verfiyEmail:userService.verfiyEmail,

  addMyReview:userService.addMyReview,
  deleteUserReview:userService.deleteUserReview,
  
  getCompanyNames:userService.getCompanyNames,
  getUserReviews:userService.getUserReviews,
  getUserReview:userService.getUserReview,
  updateUserReview:userService.updateUserReview,


  getAllUsers:userService.getAllUsers,
  getViewUsers:userService.getViewUsers,
  createView:userService.createView,
  getViews:userService.getViews,
  updateView:userService.updateView,
  deleteView:userService.deleteView,

  deleteUser:userService.deleteUser,
  getMyProfile:userService.getMyProfile,
  updateProfile:userService.updateProfile,
  
  sendForgetPassword:userService.sendForgetPassword,
  sendResetPassword:userService.sendResetPassword,

  getAnalytics:userService.getAnalytics,
  updateAnalytic:userService.updateAnalytic,
  generateAnalytics:userService.generateAnalytics,

  getUserProfile:userService.getUserProfile,
  updateUserProfile:userService.updateUserProfile,

  logout:userService.logout,

  getCompanyList:companyService.getCompanyList,

  createCompany:companyService.createCompany,
  updateCompany:companyService.updateCompany,

  getCompanyData:companyService.getCompanyData,
  updateCompanyData:companyService.updateCompanyData,
  getCompanyReviews:companyService.getCompanyReviews,
  deleteCompany:companyService.deleteCompany,
  getSortedCompanyList:companyService. getSortedCompanyList,
  getFilteredReviews:companyService.getFilteredReviews,

  getAllAdmins:adminService.getAllAdmins,
  deleteAdmin:adminService.deleteAdmin,
  createAdmin:adminService.createAdmin,
  updateAdmin:adminService.updateAdmin,
  updateProfile:adminService.updateProfile,
  getMails:adminService.getMails,
  sendMails:adminService.sendMails,
  getCompanyAnalytics:companyService.getCompanyAnalytics,
  generateCompanyAnalytics:companyService.generateCompanyAnalytics,

  getNotice:adminService.getNotice,
  createNotice:adminService.createNotice,
  updateNotice:adminService.updateNotice,
  deleteNotice:adminService.deleteNotice,
};

function setAuthHeader() {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
  }
//setting token
setAuthHeader();

function checkTokenExp(){
  let token = localStorage.getItem("token");
    //check only if token avalible and checking it is valid token 
    //if it valid token if we split according to dot the array length will greater then or =2
    if (token && token.split(".").length>=2)  {
      var decoded = jwt_decode(token);
      let currentDate = new Date();
      // JWT exp is in seconds
      if (decoded.exp * 1000 < currentDate.getTime()) {
        //removing user data from local storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return true;
      }
    }
}
checkTokenExp();
