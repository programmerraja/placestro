import axios from "axios";

export default {
  getCompanyList:function(){
    return axios.get("/admin/company/list/");
  },
  createCompany:function(body){
    return axios.post(`/admin/createCompany/`,body);
  },
  updateCompany:function(body){
    return axios.post(`/admin/updateCompany/`,body);
  },
  getCompanyData:function(companyId){
    return axios.get(`/admin/company/${companyId}`);
  },
  updateCompanyData:function(data){
    return axios.post(`/admin/company/${data.companyId}`,data);
  },
  getSortedCompanyList:function({value,type}){
    return axios.get(`/company/sortedList/?sortBy=${value}&type=${type}`);
  },
  getCompanyReviews:function(companyId){
    return axios.get("/company/getReviews/"+companyId);
  },
  deleteCompany:function(companyId){
    return axios.get("/admin/deleteCompany/"+companyId);
  },
  getFilteredReviews:function({company_id,college_id,value,type}){
    if(value && type){
      return axios.get(`/company/sortedReviews/${company_id}?collegeId=${college_id}&sortBy=${value}&type=${type}`);
    }
    return axios.get(`/company/sortedReviews/${company_id}?collegeId=${college_id}`);
  },
  getCompanyAnalytics:function(companyId){
    return axios.get("/admin/company/analytics/"+companyId);
  },
  generateCompanyAnalytics:function(year,companyId){
    
    return axios.get(`/admin/company/generateAnalytics/?year=${year}&companyId=${companyId}`);
  },
};