import {React,useState} from "react";

function CompanyEditor({company_name,setCompanyName,company_rating,setCompanyRating,company_reviews,setCompanyReviews}) {
    return ( <>
                
                  <div  className="add_review-from">
                 
                   <label forhtml="companyName" className="add_review-label">
                   <span>Company Name <span className="red_color">*</span></span></label>
                          <div className="add_review-input-wrapper">
                          <input  type="text" 
                                  placeholder="Company name"  
                                  name="companyName"  
                                  className="add_review-input" 
                                  value={company_name}
                                  onChange={(e)=>{setCompanyName(e.target.value);}}
                                  />
                         </div>
                   </div>

                   <div  className="add_review-from">
                   <label forhtml="attendedOn" className="add_review-label">
                   <span>Rating  <span className="red_color">*</span></span></label>
                         <div className="add_review-input-wrapper">
                          <input  type="number" 
                                  placeholder="Rating"  
                                  name="rating"  
                                  className="add_review-input" 
                                  value={company_rating}
                                  onChange={(e)=>{setCompanyRating(e.target.value);}}
                                  />
                         </div>
                   </div>

                   <div  className="add_review-from">
                     <label forhtml="noofreviews" className="add_review-label">
                     <span>No of reviews <span className="red_color">*</span></span></label>
                     <div className="add_review-input-wrapper">
                         <input  type="number" 
                                  placeholder="no of reviews"  
                                  name="noofreviews"  
                                  className="add_review-input" 
                                  value={company_reviews}
                                  onChange={(e)=>{setCompanyReviews(e.target.value);}}
                                  />
                           </div>
                   </div> 
          </>);

}

export default CompanyEditor;