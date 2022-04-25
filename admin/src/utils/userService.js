import axios from "axios";

export default {
  signIn: function (userCred) {
    return axios.post("/admin/user/signin",userCred);
  },
  getCounts:function () {
    return axios.get("/admin/user/getCounts");
  },
  getAllUsers: function (page,limit,sort_by,companyId) {
    let query=`limit=${limit}&page=${page}&department=${sort_by.department}&passedout=${sort_by.passedout}`;
    console.log(String(companyId).length)
    companyId && String(companyId).length>4 ? query =`limit=${limit}&page=${page}&department=${sort_by.department}&passedout=${sort_by.passedout}&companyId=${companyId}`:null;
    companyId && String(companyId).length<=4? query =`limit=${limit}&page=${page}&department=${sort_by.department}&passedout=${sort_by.passedout}&passedOut=${companyId}`:null;

    return axios.get(`/admin/user/getAllUsers/?${query}`);
  },
  getUserProfile:function(userId){
    return axios.get(`/admin/user/getUserProfile/${userId}`)
  },
  updateUserProfile:function(body){
    return axios.get(`/admin/user/updateUserProfile/`,body)
  },
  generateAnalytics:function(year){
    return axios.get("/admin/user/generateAnalytics/"+year);
  },
  getAnalytics:function(){
    return axios.get("/admin/user/getAnalytics/")
  },
  updateAnalytic:function(body){
    return axios.post("/admin/user/updateAnalytic/",body);
  },
  
  deleteUser:function (user_id) {
      return axios.get("/admin/user/deleteUser/"+user_id);
  },
  verfiyEmail:function(user_id){
    return axios.get("/admin/user/verifiyMyEmail/"+user_id);
  },
  addMyReview:function(review){
    return axios.post("/admin/user/addMyReview/",review);
  },
  updateUserReview:function(review){
    return axios.post("/admin/user/updateUserReview/",review);
  },
  deleteUserReview:function(review_id){
    return axios.get("/admin/user/deleteUserReview/"+review_id);
  },
  getCompanyNames:function(){
    return axios.get("/admin/user/companyNames/");
  },
  getUserReviews:function(user_id){
    return axios.get("/admin/user/getUserReviews/"+user_id);
  },
  getUserReview:function(review_id){
  return axios.get("/admin/user/getUserReview/"+review_id);
  },
  getMyProfile:function(){
    return axios.get("/admin/user/getMyProfile/");
  },
  updateProfile:function(user){
    return axios.post("/admin/user/updateMyProfile/",user);
  },
  logout:function(){
    return axios.get("/admin/user/logout/");
  }
};