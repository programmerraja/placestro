import React from "react";
import {Link } from "react-router-dom";

import "./style.css";

function companyCard({companiesObj})  {
 console.log(companiesObj)
  return ( 
    <>
        <div className="company_container">
        <small className="margin-0">({companiesObj.compusType?companiesObj.compusType:"OnCampus"})</small>
         <div className="company_name margin-0">
            <Link to={"/placestroAdmin/company/reviews/"+companiesObj._id} className="link flex2"> 
				<p className="companies_content-text ">{companiesObj.name}</p>
		    </Link>
            
          </div>
          <div className="edit_icon">
           <Link to={"/placestroAdmin/edit/company/"+companiesObj._id}>
				  <i className="fas fa-edit" ></i>
		    </Link>
          </div>
         
         <div className="wrapper">
                <p className="review_text-bold">Rating:
                {companiesObj.rating && companiesObj.noOfReviews?(companiesObj.rating/companiesObj.noOfReviews).toFixed(1):0}
                </p>
         </div>
          <div className="wrapper">
                <p className="review_text-bold">No Of Reviews:{companiesObj.noOfReviews}</p>
          </div>
          <div className="wrapper">
              <p className="margin-0 review_text-bold">Placed Count:
                 {companiesObj.placedCount}
              </p>
         </div>
          <div className="wrapper">
                  <p className="review_text-bold"> 
                    <Link to={"/placestroAdmin/placedStudents/"+companiesObj._id}>
                        Placed Students
				    </Link>
                  </p>
          </div>
          <div className="edit_icon icon">
			 <i className="fas fa-trash-alt" onClick={()=>{deleteCompany(companiesObj._id)}}></i>
		 </div>
        </div>
    </>);

    }

export default companyCard;
