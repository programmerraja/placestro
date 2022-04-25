import {React,useState} from "react";
import { Button } from "@material-ui/core";

import Popup from "../Popup";


function AdminPopup({year,setYear,placedcount,setPlacedCount,totalStudent,setTotalStudent,department,setDepartment,companies,setCompanies,open,setShowPopup,saveAnalytic,title}) {
       
    return ( <>
                <Popup  onClose={()=>{setShowPopup(false)}} open={open} setShowPopup={setShowPopup} title={title} onSave={saveAnalytic}>
                <div  className="add_review-from">
                   <label forhtml="companyName" className="add_review-label">
                   <span>Year <span className="red_color">*</span></span></label>
                          <div className="add_review-input-wrapper">
                          <input  type="text" 
                                  placeholder="year"  
                                  name="companyName"  
                                  className="add_review-input" 
                                  value={year}
                                  onChange={(e)=>{setYear(e.target.value);}}
                                  />
                         </div>
                   </div>

                   <div  className="add_review-from">
                   <label forhtml="attendedOn" className="add_review-label">
                   <span>placed Count <span className="red_color">*</span></span></label>
                         <div className="add_review-input-wrapper">
                          <input  type="number" 
                                  placeholder="placedCount"  
                                  name="rating"  
                                  className="add_review-input" 
                                  value={placedcount}
                                  onChange={(e)=>{setPlacedCount(e.target.value);}}
                                  />
                         </div>
                   </div>
                 <div  className="add_review-from">
                     <label forhtml="noofreviews" className="add_review-label">
                     <span>totalStudent <span className="red_color">*</span></span></label>
                     <div className="add_review-input-wrapper">
                         <input  type="text" 
                                  placeholder="totalStudent"  
                                  name="noofreviews"  
                                  className="add_review-input" 
                                  value={totalStudent}
                                  onChange={(e)=>{setTotalStudent(e.target.value);}}
                                  />
                           </div>
                 </div>
                 {Object.keys(department).map(dep=>{
                        return (<div  className="add_review-from">
                        <label forhtml="noofreviews" className="add_review-label">
                        <span>{dep}(placed student count) <span className="red_color">*</span></span></label>
                        <div className="add_review-input-wrapper">
                            <input  type="text" 
                                     placeholder=".."  
                                     name="noofreviews"  
                                     className="add_review-input" 
                                     value={department[dep]}
                                     onChange={(e)=>{setDepartment({...department,[dep]:e.target.value});}}
                                     />
                              </div>
                    </div>
                    )
                 })}
                  <div  className="add_review-from">
                     <label forhtml="noofreviews" className="add_review-label">
                     <span>companies <span className="red_color">*</span></span></label>
                     <div className="add_review-input-wrapper">
                         <input  type="text" 
                                  placeholder="companies"  
                                  name="noofreviews"  
                                  className="add_review-input" 
                                  value={companies.join(",")}
                                  onChange={(e)=>{setCompanies(e.target.value.split(","));}}
                                  />
                           </div>
                 </div>
                 
                   
              
                </Popup>
          </>);

}

export default AdminPopup;

