import axios from "axios";

export default {
  getCompanyList:function(){
    return axios.get("/company/list/");
  },
  getSortedCompanyList:function({value,type}){
    return axios.get(`/company/sortedList/?sortBy=${value}&type=${type}`);
  },
  getFilteredCompanyList:function({value,type}){
      return axios.get(`/company/sortedList/?sortBy=${value}&type=${type}`);
  },
  getCompanyReviews:function(company_id){
    return axios.get("/company/getReviews/"+company_id);
  },
  getSortedReviews:function({company_id,college_id,value,type}){
    if(college_id){
      return axios.get(`/company/sortedReviews/${company_id}?&sortBy=${value}&type=${type}`);
    }
    return axios.get(`/company/sortedReviews/${company_id}?sortBy=${value}&type=${type}`);
  },
  getFilteredReviews:function({company_id,college_id,value,type}){
    if(value && type){
      return axios.get(`/company/sortedReviews/${company_id}?collegeId=${college_id}&sortBy=${value}&type=${type}`);
    }
    return axios.get(`/company/sortedReviews/${company_id}?collegeId=${college_id}`);
  },
};