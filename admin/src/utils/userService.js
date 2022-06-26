import axios from "axios";

export default {
  signIn: function (userCred) {
    return axios.post("/admin/user/signin",userCred);
  },
  getCounts:function () {
    return axios.get("/admin/user/getCounts");
  },
  getAllUsers: function (page,limit,sort_by,companyId) {
    let query=`limit=${limit}&page=${page}&department=${sort_by.department}&passedout=${sort_by.passedOut}`;
    console.log(String(companyId).length)
    companyId && String(companyId).length>4 ? query =`limit=${limit}&page=${page}&department=${sort_by.department}&passedout=${sort_by.passedOut}&companyId=${companyId}`:null;
    companyId && String(companyId).length<=4? query =`limit=${limit}&page=${page}&department=${sort_by.department}&passedout=${sort_by.passedOut}&passedOut=${companyId}`:null;

    return axios.get(`/admin/user/getAllUsers/?${query}`);
  },
  getProfile:function(userId){
    return axios.get(`/admin/user/getProfile/${userId}`)
  },
  updateProfile:function(body){
    return axios.get(`/admin/user/updateProfile/`,body)
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
    return axios.get("/admin/user/verifiyEmail/"+user_id);
  },
  addReview:function(review){
    return axios.post("/admin/user/addReview/",review);
  },
  updateReview:function(review){
    return axios.post("/admin/user/updateReview/",review);
  },
  deleteReview:function(review_id){
    return axios.get("/admin/user/deleteReview/"+review_id);
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
  getProfile:function(){
    return axios.get("/admin/user/getProfile/");
  },
  updateProfile:function(user){
    return axios.post("/admin/user/updateProfile/",user);
  },
  logout:function(){
    return axios.get("/admin/user/logout/");
  },

  getViewUsers: function (viewId,page,limit) {
    let query=`viewId=${viewId}&limit=${limit}&page=${page}`;
    return axios.get(`/admin/user/getViewUsers/?${query}`);
  },
  getViews:function(){
    return axios.get(`/admin/user/getViews`);
  },
  createView: function (body) {
    return axios.post(`/admin/user/createView`,body);
  },
  updateView:function(body){
    return axios.post(`/admin/user/updateView`,body);
  },
  deleteView:function(id){
    return axios.get(`/admin/user/deleteView/${id}`);
  },
};