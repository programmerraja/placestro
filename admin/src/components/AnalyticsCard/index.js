import React from "react";
import {Link } from "react-router-dom";

import "./style.css";

function AnalyticsCard({analyticsObj,showEdit})  {
  return ( 
    <>
        <div className="company_container">
         <div className="company_name margin-0">
				<p className="companies_content-text ">{analyticsObj.year}</p>
          </div>
          <div className="edit_icon">
				  <i className="fas fa-edit" onClick={()=>showEdit(analyticsObj)}></i>
          </div>
          <div className="wrapper">
                <p className="review_text-bold">Total Student:{analyticsObj.totalStudent}</p>
          </div>
         <div className="wrapper">
                <p className="review_text-bold">Placed Count:
                    {analyticsObj.placedCount}
                </p>
         </div>
          <div className="wrapper">
               <details>
                    <summary className="review_text-bold round_name" >Department wise</summary>
                    <div className="review_text">
                        {Object.keys(analyticsObj.department).map((dep)=>
                            <p className="review_text-bold p-3">{dep}:{analyticsObj.department[dep]}</p>
                        )}
                    </div>
                </details>
         </div>
         <div className="wrapper">
                <details>
                    <summary className="review_text-bold round_name" >Compaines</summary>
                    <div className="review_text">
                        {
                            analyticsObj.companies.map((dep)=><p className="review_text p-3">{dep}</p>)
                        }
                    </div>
                </details>
                
         </div>
          <div className="wrapper">
                  <p className="review_text-bold"> 
                    <Link to={"/placestroAdmin/placedStudents/"+analyticsObj.year}>
                        Placed Students
				    </Link>
                  </p>
          </div>
         
        </div>
    </>);

    }

export default AnalyticsCard;
