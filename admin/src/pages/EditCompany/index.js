import {React,useState,useEffect,useRef} from "react";
import {useHistory,useParams } from "react-router-dom";

import SquareLoader from  "../../components/SquareLoader";

import CompanyEditor from "../../components/CompanyEditor"

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";


import "./style.css"


function EditReview() {

   const [loading,setLoading]=useState(true);
   const [company_name,setCompanyName]=useState("");
   const [company_rating,setCompanyRating]=useState("");
   const [company_reviews,setCompanyReviews]=useState("");
   const [company_placed_count,setCompanyPlacedCount]=useState("");


   const tcompany_name=useRef();
   const tcompany_rating=useRef();
   const tcompany_reviews=useRef();
   const tcompany_count=useRef();


   const history = useHistory();
   const { companyId } = useParams();

   useEffect(()=>{
      API.getCompanyData(companyId)
      .then((res)=>{  
        setLoading(false);
        setCompanyName(res.data.company.name);
        setCompanyRating(res.data.company.rating);
        setCompanyReviews(res.data.company.noOfReviews);
        setCompanyPlacedCount(res.data.company.placedCount);
        tcompany_name.current=res.data.company.name;
        tcompany_rating.current=res.data.company.rating;
        tcompany_reviews.current=res.data.company.noOfReviews;
        tcompany_count.current=res.data.company.placedCount;

      })
      .catch((res)=>{
        setLoading(false);
        if(res.data && res.data.msg){
          errorHandler(true,res.data.msg);
        }else{
          errorHandler(true);
        }
      })
   },[companyId])

 
  
  
   let onUpdate=()=>{
      if(company_name===tcompany_name.current && company_rating===tcompany_rating.current && company_reviews===tcompany_reviews.current && company_placed_count===tcompany_count){
        errorHandler(false,"Sucessfully updated");
        history.push("/placestroAdmin/companies");
        return
      }
      setLoading(true);
      API.updateCompanyData({companyId,company_name,company_rating,company_reviews,company_placed_count})
      .then((res)=>{  
        setLoading(false);
        errorHandler(false,res.data.msg);
        history.push("/placestroAdmin/companies");
      })
      .catch((res)=>{
        setLoading(false);
        if(res.data && res.data.msg){
          errorHandler(true,res.data.msg);
        }else{
          errorHandler(true);
        }
      })
   
   }

   
return ( <>
            <SquareLoader  loading={loading}/>
            <div className="add_review-wrapper">
              <div className="add_review-container">
                <CompanyEditor company_name={company_name} 
                               setCompanyName={setCompanyName} 
                               company_rating={company_rating}
                               setCompanyRating={setCompanyRating}
                               company_reviews={company_reviews}
                               setCompanyReviews={setCompanyReviews}
                               company_placed_count={company_placed_count}
                               setCompanyPlacedCount={setCompanyPlacedCount}/> 
                 <div className="add_review-button">
                     <button onClick={onUpdate} >update</button>
                 </div>
                  
              </div>
            </div>
          </>);

}

export default EditReview;