import axios from "axios";

export default {
  getCompanyList:function(){
    return axios.get("/admin/company/list/");
  },
  getCollegeList:function(){
    return axios.get("/admin/college/list/");
  },
  deleteCollege:function(collegeId){
    return axios.get("/admin/college/delete/"+collegeId);
  },
  getCollegeData:function(collegeId){
    return axios.get(`/admin/college/${collegeId}`);
  },
  updateCollegeData:function(data){
    return axios.post(`/admin/college/${data.collegeId}`,data);
  },
  getCompanyData:function(companyId){
    return axios.get(`/admin/company/${companyId}`);
  },
  updateCompanyData:function(data){
    return axios.post(`/admin/company/${data.companyId}`,data);
  },
  getFilteredCompanyList:function({college_id,value,type}){
    if(value && type){
      return axios.get(`/company/sortedList/?collegeId=${college_id}&sortBy=${value}&type=${type}`);
    }
    return axios.get(`/company/sortedList/?collegeId=${college_id}`);
  },
  getCompanyReviews:function(compainyId){
    return axios.get("/company/getReviews/"+compainyId);
  },
  deleteCompany:function(companyId){
    return axios.get("/admin/company/delete/"+companyId);
  },
  getFilteredReviews:function({company_id,college_id,value,type}){
    if(value && type){
      return axios.get(`/company/sortedReviews/${company_id}?collegeId=${college_id}&sortBy=${value}&type=${type}`);
    }
    return axios.get(`/company/sortedReviews/${company_id}?collegeId=${college_id}`);
  },
};