import axios from "axios";

export default {
  getAllAdmins: function (page,limit,sort_by) {
    let query=`limit=${limit}&page=${page}&department=${sort_by.department}`;
    return axios.get(`/admin/getAllAdmins/?${query}`);
  },
  deleteAdmin:function (user_id) {
      return axios.get("/admin/deleteAdmin/"+user_id);
  },
  createAdmin:function(body){
    return axios.post("/admin/createAdmin/",body);
  },
  updateAdmin:function(body){
    return axios.post("/admin/updateAdmin/",body);
  },
  getMails:function(filter){
    return axios.get(`/admin/getMails?department=${filter.department}&currentYear=${filter.currentYear}`)
  },
  sendMails:function({subject,}){
    return axios.post(`/admin/sendMails`,body)
  }
};