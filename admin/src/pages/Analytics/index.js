import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import swal from "sweetalert";
import {Box,Container} from "@material-ui/core";

import SquareLoader from "../../components/SquareLoader";
import AnalyticsCard from "../../components/AnalyticsCard";
import AnalyticPopup from "../../components/AnalyticPopup";

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";

function Analytics(){
  const [analytics,setAnalytics]=useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [id,setId]=useState();
  const [year,setYear]=useState();
  const [placedcount,setPlacedCount]=useState();
  const [totalStudent,setTotalStudent]=useState();
  const [department,setDepartment]=useState({});
  const [companies,setCompanies]=useState([]);
  
  const [isCreate,setIsCreate]=useState(true);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
  	API.getAnalytics()
  	.then((res)=>{
		setLoading(false);
        if(res.data.status==="sucess"){
              setAnalytics(res.data.data);
         }
         else{
         	errorHandler(true,res.data.msg);
         }
   	})
   	.catch((res)=>{
      setLoading(false);
      if(res.data && res.data.msg){
         	errorHandler(true,res.data.msg);
      }else{
         	errorHandler(true);
      }
    });

  },[])

  const saveAnalytic=()=>{
	  console.log(year,department,companies,totalStudent)
	  if(year && placedcount && companies && department && totalStudent){
		API.updateAnalytic({id,year,placeCount:placedcount,companies,department,totalStudent})
		.then((res) => {
            setLoading(false);
            setShowPopup(false)
            errorHandler(false,res.data.msg); 
          })
          .catch((res) => {
            setLoading(false);
            setShowPopup(false)
            errorHandler(true,res.data.msg); 
          });
        return
	  }
	  errorHandler(true,"Plse Fill all the data");
  }

  const showEdit=({_id,year,placeCount,department,companies,totalStudent})=>{
	  setId(_id);
	  setYear(year);
	  setDepartment(department);
	  setPlacedCount(placeCount)
	  setCompanies(companies);
	  setTotalStudent(totalStudent);
	  setShowPopup(true);
  }

  if(!loading){
	  return ( 
	    <>
	    <SquareLoader  loading={loading}/>
			<div className="Analytics_container">
				<div className="companies_content-wrapper">
					{analytics.map((analyticsObj,index)=><AnalyticsCard analyticsObj={analyticsObj} showEdit={showEdit} />)}
				</div>
			 </div>
			 {showPopup &&  <AnalyticPopup  
                        setShowPopup={setShowPopup} 
                        open={showPopup} 
                        year={year} 
                        setYear={setYear}
                        totalStudent={totalStudent}
                        setTotalStudent={setTotalStudent}
                        placedcount={placedcount}
                        setPlacedCount={setPlacedCount}
                        department={department}
                        setDepartment={setDepartment}
                        companies={companies}
                        setCompanies={setCompanies}
						open={showPopup}
                        title={"Update Analytics"}
                        saveAnalytic={saveAnalytic}
                        /> }

	    </>);
	  }
	else{
		return ( 
	    <>
	    	<SquareLoader  loading={loading}/>
	    </>
	    )
	}
}

export default Analytics;