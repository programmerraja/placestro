import {React,useState,useEffect,useRef} from "react";
import {useHistory,useParams } from "react-router-dom";

import SquareLoader from  "../../components/SquareLoader";

import CollegeEditor from "../../components/CollegeEditor"

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";



function EditReview() {

   const [loading,setLoading]=useState(true);
   const [college_name,setCollegeName]=useState("");
   const [college_code,setCollegeCode]=useState("");

   const tcollege_name=useRef();
   const tcollege_code=useRef();

   const history = useHistory();
   const { collegeId } = useParams();

   useEffect(()=>{
      API.getCollegeData(collegeId)
      .then((res)=>{  
        setLoading(false);
        setCollegeName(res.data.college.name);
        setCollegeCode(res.data.college.code);
        tcollege_name.current=res.data.college.name;
        tcollege_code.current=res.data.college.code;

      })
      .catch((res)=>{
        setLoading(false);
        if(res.data && res.data.msg){
          errorHandler(true,res.data.msg);
        }else{
          errorHandler(true);
        }
      })
   },[collegeId])

 
  
  
   let onUpdate=()=>{
      if(college_name===tcollege_name.current && college_code===tcollege_code.current){
        errorHandler(false,"Sucessfully updated");
        history.push("/placestroAdmin/colleges");
        return
      }
      setLoading(true);
      API.updateCollegeData({collegeId,college_name,college_code})
      .then((res)=>{  
        setLoading(false);
        errorHandler(false,res.data.msg);
        history.push("/placestroAdmin/colleges");
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
                <CollegeEditor college_name={college_name} 
                               setCompanyName={setCollegeName} 
                               company_code={college_code}
                               setCollegeCode={setCollegeCode}/>

                 <div className="add_review-button">
                     <button onClick={onUpdate} >update</button>
                 </div>
                  
              </div>
            </div>
          </>);

}

export default EditReview;