import React from "react";
import {Link } from "react-router-dom";

import "./style.css";

function companyCard({companiesObj,editCompany,deleteCompany})  {
  return ( 
    <>
        <div className="company_container">
        <small className="margin-0">({companiesObj.campusType?companiesObj.campusType:"OnCampus"})</small>
         <div className="company_name margin-0">
                   <Link to={"/placestroAdmin/company/analytics/"+companiesObj._id}>
				<p className="companies_content-text ">{companiesObj.name}</p>
                   </Link>
          </div>
          <div className="edit_icon">
           
			    	  <i className="fas fa-edit" onClick={()=>{editCompany(companiesObj)}}></i>
		  
          </div>
         
         <div className="wrapper">
                <p className="review_text-bold">Rating:
                {companiesObj.rating && companiesObj.noOfReviews?(companiesObj.rating/companiesObj.noOfReviews).toFixed(1):0}
                </p>
         </div>
          <div className="wrapper">
                <p className="review_text-bold">No Of Reviews:{companiesObj.noOfReviews}</p>
          </div>
          {companiesObj.status && <div className="wrapper">
                <p className="review_text-bold">Status:{companiesObj.status}</p>
          </div>}
          {companiesObj.upcomingDate && <div className="wrapper">
                <p className="review_text-bold">Upcoming Date:{new Date(companiesObj.upcomingDate).toDateString()}</p>
          </div>}
          {companiesObj.lastVisitedDate && <div className="wrapper">
                <p className="review_text-bold">Last Visited Date:{new Date(companiesObj.lastVisitedDate).toDateString()}</p>
          </div>}
          <div className="wrapper">
              <p className="margin-0 review_text-bold">Placed Count:
                 {companiesObj.placedCount}
              </p>
         </div>
          <div className="wrapper">
                  <p className="review_text-bold"> 
                    <Link to={"/placestroAdmin/placedStudents/"+companiesObj._id}>Placed Students</Link>
                  </p>
          </div>
          <div className="wrapper">
          <p className="review_text-bold ">
            <Link to={"/placestroAdmin/company/reviews/"+companiesObj._id} > Reviews</Link>
          </p>
          </div>
          <div className="edit_icon icon">
			 <i className="fas fa-trash-alt" onClick={()=>{deleteCompany(companiesObj._id)}}></i>
		 </div>
        </div>
    </>);

    }

export default companyCard;
