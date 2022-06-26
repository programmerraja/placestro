import axios from "axios";

export default {
  signIn: function (userCred) {
    return axios.post("/user/signin",userCred);
  },
  signUp: function (userCred) {
    return axios.post("/user/signup/",userCred);
  },
  getQuestion:function(){
    return axios.get("/user/getQuestion");
  },
  submitAnswer:function(answer){
    return axios.post("/user/submitAnswer",answer)
  },
  verfiyEmail:function(user_id){
    return axios.get("/user/verifiyEmail/"+user_id);
  },
  sendForgetPassword:function(email){
    return axios.post("/user/forgetPassword",{email:email});
  },
  sendResetPassword:function(password_data){
    return axios.post("/user/resetPassword",password_data);
  },
  logout:function(){
    return axios.get("/user/logout/");
  },

  getProfile:function(){
    return axios.get("/user/getProfile/");
  },
  updateProfile:function(user){
    return axios.post("/user/updateProfile/",user);
  },

  getCompanyNames:function(){
    return axios.get("/user/companyNames/");
  },
  getUserReviews:function(){
    return axios.get("/user/getUserReviews/");
  },
  getUserReview:function(review_id){
    return axios.get("/user/getUserReview/"+review_id);
  },
  likeTheReview:function(review_id){
    return axios.get("/user/likeTheReview/"+review_id);
  },
  addReview:function(review){
    return axios.post("/user/addReview/",review);
  },
  updateReview:function(review){
    return axios.post("/user/updateReview/",review);
  },
  deleteReview:function(review_id){
    return axios.get("/user/deleteReview/"+review_id);
  },
  getNotice:function(){
    return axios.get("/user/getNotice/");
  },
};