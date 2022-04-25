import React from "react";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {Box,Container,Button} from "@material-ui/core";



import SquareLoader from "../../components/SquareLoader";
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

function CompanyAnalytics(){
  const [analytics,setAnalytics]=useState({});
  
  const [loading,setLoading]=useState(true);

  const [year,setYear]=useState();
  
  const [chartData,setChartData]=useState(data)
  const [chartData2,setChartData2]=useState(data)
  const [chartDep,setChartDep]=useState("CSE")
 
  const { companyId } = useParams();


  useEffect(()=>{
  	API.getCompanyAnalytics(companyId)
  	.then((res)=>{
	    	setLoading(false);
        if(res.data.status==="sucess"){
              setAnalytics(res.data.analytics);

              let labels=Object.keys(res.data.analytics).map((year)=>year)

              let datasets=[{label:"Placed Students Year Wise",data:[],backgroundColor: 'red'}]

              datasets[0].data=labels.map((year)=>{
                let sum=0
                Object.keys(res.data.analytics[year]).forEach((dep)=>{
                  sum+=res.data.analytics[year][dep]
                })
                return sum;
              })
              console.log({labels,datasets})

              setChartData({labels,datasets})

               labels=Object.keys(res.data.analytics).map((year)=>year)
               datasets=[{label:"Placed Students Department Wise",data:[],backgroundColor: 'red'}]

              datasets[0].data=Object.keys(res.data.analytics).map((year)=>res.data.analytics[year][chartDep])
              console.log({labels,datasets})
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

    let labels=Object.keys(analytics).map((year)=>year)
    let datasets=[{label:"Placed Students Department Wise",data:[],backgroundColor: 'red'}]

    datasets[0].data=Object.keys(analytics).map((year)=>analytics[year][chartDep]?analytics[year][chartDep]:0)
    console.log({labels,datasets})
    setChartData2({labels,datasets})
             
  },[chartDep])

  
  const generateAnalytics=()=>{
    if(year>=2018 && year<=2022){
        API.generateCompanyAnalytics(year,companyId)
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
			<div className="Analytics_container">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",margin:"1rem"}}>
          <input type="text" className="analytic-input" placeholder="year.." value={year} onChange={(e)=>setYear(e.target.value)}/>
          <button onClick={generateAnalytics}   className="swal-button analytic_btn">Generate</button>
        </div>
          <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap",marginTop:"4rem"}}>
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
      </div>
    </>
        );
	  }
	else{
		return ( 
	    <>
	    	<SquareLoader  loading={loading}/>
	    </>
	    )
	}
}

export default CompanyAnalytics;