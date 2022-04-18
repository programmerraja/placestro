import {React,useState} from "react";

import Popup from "../Popup";

function convertDate(date){
    let now = new Date(date);
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);

    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    return today;

}

function CompanyPopup({name,setName,rating,setRating,noOfReviews,setReviews,placedCount,setPlacedCount,status,setStatus,upcomingDate,setUpcomingDate,lastVisitedDate,setLastVisitedDate,campusType,setCampusType,open,setShowPopup,saveCompany,title}) {
       
    return ( <>
                <Popup  onClose={()=>{setShowPopup(false)}} open={open} setShowPopup={setShowPopup} title={title} onSave={saveCompany}>
                <div  className="add_review-from">
                 
                 <label forhtml="companyName" className="add_review-label">
                 <span>Company Name <span className="red_color">*</span></span></label>
                        <div className="add_review-input-wrapper">
                        <input  type="text" 
                                placeholder="Company name"  
                                name="companyName"  
                                className="add_review-input" 
                                value={name}
                                onChange={(e)=>{setName(e.target.value);}}
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
                                value={rating}
                                onChange={(e)=>{setRating(e.target.value);}}
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
                                value={noOfReviews}
                                onChange={(e)=>{setReviews(e.target.value);}}
                                />
                         </div>
                 </div>
                 <div  className="add_review-from">
                   <label forhtml="placedcount" className="add_review-label">
                   <span>Placed Count <span className="red_color">*</span></span></label>
                   <div className="add_review-input-wrapper">
                       <input  type="number" 
                                placeholder="Placed Count"  
                                name="placedcount"  
                                className="add_review-input" 
                                value={placedCount}
                                onChange={(e)=>{setPlacedCount(e.target.value);}}
                                />
                         </div>
                 </div>
                 <div className="add_review-from">
						 <label className="filter_option-label">
		                   <span>Status: </span></label>
						   <select
		                          className="filter_option" 
		                          onChange={(e)=>{
		                          	setStatus(e.target.value);
		                          	}} defaultValue={status}>
			                  <option value="VISITED">Visited</option>
			                  <option value="UPCOMING">Upcoming</option>
		                 </select>
	          </div>
              <div className="add_review-from">
						 <label className="filter_option-label">
		                   <span>Campus Type: </span></label>
						   <select
		                          className="filter_option" 
		                          onChange={(e)=>{
		                          	setCampusType(e.target.value);
		                          	}} defaultValue={campusType}>
			                  <option value="onCampus">onCampus</option>
			                  <option value="offCampus">offCampus</option>
		                 </select>
	          </div>
                 <div  className="add_review-from">
                   <label forhtml="placedcount" className="add_review-label">
                   <span>Upcoming Date<span className="red_color">*</span></span></label>
                   <div className="add_review-input-wrapper">
                       <input  type="date" 
                                placeholder="Placed Count"  
                                name="placedcount"  
                                className="add_review-input" 
                                value={convertDate(upcomingDate)}
                                onChange={(e)=>{setUpcomingDate(e.target.value);}}
                                />
                         </div>
                 </div> 
                 <div  className="add_review-from">
                   <label forhtml="placedcount" className="add_review-label">
                   <span>Last Visited Date <span className="red_color">*</span></span></label>
                   <div className="add_review-input-wrapper">
                       <input  type="date" 
                                name="placedcount"  
                                className="add_review-input" 
                                value={convertDate(lastVisitedDate)}
                                onChange={(e)=>{setLastVisitedDate(e.target.value);}}
                                />
                         </div>
                 </div> 
                </Popup>
          </>);

}

export default CompanyPopup;

