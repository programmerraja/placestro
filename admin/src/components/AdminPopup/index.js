import {React,useState} from "react";
import { Button } from "@material-ui/core";

import Popup from "../Popup";
import "./style.css"


function AdminPopup({name,setName,email,setEmail,password,setPassword,department,setDepartment,admin_type,setAdminType,open,setShowPopup,saveAdmin,title,isCreate}) {
       
    return ( <>
                <Popup  onClose={()=>{setShowPopup(false)}} open={open} setShowPopup={setShowPopup} title={title} onSave={saveAdmin}>
                <div  className="add_review-from">
                   <label forhtml="companyName" className="add_review-label">
                   <span>Admim Name <span className="red_color">*</span></span></label>
                          <div className="add_review-input-wrapper">
                          <input  type="text" 
                                  placeholder="name"  
                                  name="companyName"  
                                  className="add_review-input" 
                                  value={name}
                                  onChange={(e)=>{setName(e.target.value);}}
                                  />
                         </div>
                   </div>

                   <div  className="add_review-from">
                   <label forhtml="attendedOn" className="add_review-label">
                   <span>Email <span className="red_color">*</span></span></label>
                         <div className="add_review-input-wrapper">
                          <input  type="email" 
                                  placeholder="email"  
                                  name="rating"  
                                  className="add_review-input" 
                                  value={email}
                                  onChange={(e)=>{setEmail(e.target.value);}}
                                  />
                         </div>
                   </div>
                {isCreate && <div  className="add_review-from">
                     <label forhtml="noofreviews" className="add_review-label">
                     <span>Password <span className="red_color">*</span></span></label>
                     <div className="add_review-input-wrapper">
                         <input  type="text" 
                                  placeholder="password"  
                                  name="noofreviews"  
                                  className="add_review-input" 
                                  value={password}
                                  onChange={(e)=>{setPassword(e.target.value);}}
                                  />
                           </div>
                 </div>}
                 {!isCreate && <div  className="add_review-from">
                     <label forhtml="noofreviews" className="add_review-label">
                     <span>Password (new password )</span></label>
                     <div className="add_review-input-wrapper">
                         <input  type="text" 
                                  placeholder="password"  
                                  name="noofreviews"  
                                  className="add_review-input" 
                                  value={password}
                                  onChange={(e)=>{setPassword(e.target.value);}}
                                  />
                           </div>
                 </div>}
                   
                <div className="add_review-from">
                        <label for="department"> Department<span className="red_color">*</span> </label>
                        <select name="department"  onChange={(e)=>{setDepartment(e.target.value);}}>
                        <option value="CSE">CSE</option>
                        <option value="MECH">MECH</option>
                        <option value="EEE">EEE</option>
                        <option value="ECE">ECE</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="OTHER">OTHER</option>
                        </select>
                </div> 
                <div className="add_review-from">
                        <label for="admin"> admin Type<span className="red_color">*</span> </label>
                        <select name="admin"  onChange={(e)=>{setAdminType(e.target.value);}}>
                            <option value="SUPER_ADMIN">super admin </option>
                            <option value="ADMIN">admin</option>
                            <option value="VIEWER">viewer</option>
                        </select>
                </div>   
                {/* <small>Super Admin->Full power</small><br/>
                <small>Admin->Cant create Admin </small><br/>
                <small>Viewer->Only can view the data </small> */}


                </Popup>
          </>);

}

export default AdminPopup;

