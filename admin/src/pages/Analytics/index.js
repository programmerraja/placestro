import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import swal from "sweetalert";
import {Box,Container,Button} from "@material-ui/core";


import SquareLoader from "../../components/SquareLoader";
import AnalyticsCard from "../../components/AnalyticsCard";
import AnalyticPopup from "../../components/AnalyticPopup";
import BarChart from "../../components/BarChart";

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";


const labels = ["a","b","c"];
  
const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 10),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

function Analytics(){
  const [analytics,setAnalytics]=useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [id,setId]=useState();
  const [year,setYear]=useState();
  const [placedcount,setPlacedCount]=useState();
  const [totalStudent,setTotalStudent]=useState();
  const [department,setDepartment]=useState({});
  const [companies,setCompanies]=useState([]);

  const [chartData,setChartData]=useState(data)
  const [chartData2,setChartData2]=useState(data)
  const [chartDep,setChartDep]=useState("CSE")

  const [newYear,setnewYear]=useState();

  const [isCreate,setIsCreate]=useState(true);

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
  	API.getAnalytics()
  	.then((res)=>{
		setLoading(false);
        if(res.data.status==="sucess"){
              setAnalytics(res.data.data);
              let labels=res.data.data.map((obj)=>obj.year)
              let datasets=[{label:"Placed Students",data:[],backgroundColor: 'red'}]
              datasets[0].data=res.data.data.map((obj)=>obj.placedCount)
              setChartData({labels,datasets})
              
              datasets=[{label:chartDep+"Department",data:[],backgroundColor: 'rgba(255, 99, 132, 0.5)'}]

              datasets[0].data =res.data.data.map((obj)=>obj.department[chartDep]);
                  
              setChartData2({labels,datasets})
         }
         else{
           console.log(res.data.msg)
         	errorHandler(true,res.data.msg);
         }
   	})
   	.catch((res)=>{
       console.log(res)
      setLoading(false);
      if(res.data && res.data.msg){
         	errorHandler(true,res.data.msg);
      }else{
         	errorHandler(true);
      }
    });

  },[])

  useEffect(()=>{

    let labels=analytics.map((obj)=>obj.year)
    
    let datasets=[{label:"Department",data:[],backgroundColor: 'rgba(255, 99, 132, 0.5)'}]

    datasets[0].data =analytics.map((obj)=>obj.department[chartDep]);
        
    setChartData2({labels,datasets})
  },[chartDep])

  const saveAnalytic=()=>{
	  console.log(year,department,companies,totalStudent)
	  if(year && placedcount && companies && department && totalStudent){
		API.updateAnalytic({id,year,placedCount:placedcount,companies,department,totalStudent})
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

  const showEdit=({_id,year,placedCount,department,companies,totalStudent})=>{
	  setId(_id);
	  setYear(year);
	  setDepartment(department);
	  setPlacedCount(placedCount)
	  setCompanies(companies);
	  setTotalStudent(totalStudent);
	  setShowPopup(true);
  }

  const generateAnalytics=()=>{
    if(newYear>2018 && newYear<2022){
        API.generateAnalytics(newYear)
        .then((res) => {
          errorHandler(false,res.data.msg); 
        })
        .catch((res) => {
          errorHandler(true,res.data.msg); 
        });
    }else{
      errorHandler(true,"Enter the valid year"); 
    }
  }

  if(!loading){
	  return ( 
	    <>
	    <SquareLoader  loading={loading}/>
      <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap"}}>
        <BarChart data={chartData} title={"Student placed Year Wise"}/>
        <div>
        <label className="filter_option-label"><span>Department: </span></label>
                              <select className="filter_option" 
                              onChange={(e)=>setChartDep(e.target.value)} defaultValue={chartDep}>
                                      <option value="CSE">CSE</option>
                                      <option value="EEE">EEE</option>
                                      <option value="ECE">ECE</option>
                                      <option value="MECH">MECH</option>
                                      <option value="CIVIL">CIVIL</option>
                            </select>
          <BarChart data={chartData2} title={"Department wise placed student count"}/>
        </div>
      </div>
			<div className="Analytics_container">
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",margin:"1rem"}}>
          <input type="text" className="analytic-input" placeholder="year.." value={newYear} onChange={(e)=>setnewYear(e.target.value)}/>
          <button onClick={generateAnalytics}   className="swal-button analytic_btn">Generate</button>
        </div>
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