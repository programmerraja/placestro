import {React,useState} from "react";

function CollegeEditor({college_name,setCollegeName,company_code,setCollegeCode}) {
    return ( <>
                
                  <div  className="add_review-from">
                 
                   <label forhtml="collegeName" className="add_review-label">
                   <span>College Name <span className="red_color">*</span></span></label>
                          <div className="add_review-input-wrapper">
                          <input  type="text" 
                                  placeholder="College name"  
                                  name="collegeName"  
                                  className="add_review-input" 
                                  value={college_name}
                                  onChange={(e)=>{setCollegeName(e.target.value);}}
                                  />
                         </div>
                   </div>

                   <div  className="add_review-from">
                   <label forhtml="code" className="add_review-label">
                   <span>Code  <span className="red_color">*</span></span></label>
                         <div className="add_review-input-wrapper">
                          <input  type="number" 
                                  placeholder="code"  
                                  name="code"  
                                  className="add_review-input" 
                                  value={company_code}
                                  onChange={(e)=>{setCompanyCode(e.target.value);}}
                                  />
                         </div>
                   </div>
          </>);

}

export default CollegeEditor;