import React, { useState ,useEffect} from "react";
import Box from "@material-ui/core/Box";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import BarChart from "../../components/BarChart";


import API from "../../utils/API";

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


export default function Home(props) {
 const [user_count, setUserCount] = useState("...");
 const [review_count, setReviewCount] = useState("...");
 const [company_count, setCompanyCount] = useState("...");
 const [placed_count, setPlacedCount] = useState("...");

 const [analytics,setAnalytics]=useState([]);
 const [chartData,setChartData]=useState(data)
 const [chartData2,setChartData2]=useState(data)
 const [chartDep,setChartDep]=useState("CSE")

 const theme = useTheme();
 const matches = useMediaQuery('(max-width:800px)');

  useEffect(() => {
    API.getCounts()
      .then((res) => {
        if(res.data.status==="sucess"){
          setUserCount(res.data.user_count);
          setReviewCount(res.data.review_count);
          setCompanyCount(res.data.company_count);
          setPlacedCount(res.data.placed_count);
        }else{
          setUserCount("Failed");
          setReviewCount("Failed");
          setCompanyCount("Failed");
        }
      })
      .catch((error) => {
          setUserCount("Failed");
          setReviewCount("Failed");
          setCompanyCount("Failed");
      });

    API.getAnalytics()
      .then((res)=>{
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
          if(res.data && res.data.msg){
               errorHandler(true,res.data.msg);
          }else{
               errorHandler(true);
          }
        });
    
  }, []);

    useEffect(()=>{

      let labels=analytics.map((obj)=>obj.year)
      
      let datasets=[{label:"Department",data:[],backgroundColor: 'rgba(255, 99, 132, 0.5)'}]

      datasets[0].data =analytics.map((obj)=>obj.department[chartDep]);
          
      setChartData2({labels,datasets})
    },[chartDep])


  return (
    <div className="homepage_container">
      <Box display="flex" flexDirection ={ matches ? "column" : "row" } justifyContent = "space-around" alignItems = "center" >
        <Box p={4} mx={10} lg={2} width={ matches ? "160px" : "200px" } border={1}  
        align="center" margin={matches ? "10px" : 0}>
          <Box mb={3}>TOTAL Students</Box>
          <h2 >{user_count}</h2>
        </Box>

        <Box p={4} mx={10} lg={2} width={ matches ? "160px" : "200px" } border={1} align="center" margin={matches ? "10px" : 0}>
          <Box mb={3}>TOTAL REVIEW COUNT</Box>
          <h2 >{review_count}</h2>
        </Box>

        <Box p={4} mx={10} lg={2} width={ matches ? "160px" : "200px" } border={1} align="center" margin={matches ? "10px" : 0}>
          <Box mb={3}>TOTAL PLACED COUNT</Box>
          <h2 >{placed_count}</h2>
        </Box>

        <Box p={4} mx={10} lg={2} width={ matches ? "160px" : "200px" } border={1} align="center" margin={matches ? "10px" : 0}>
          <Box mb={3}>TOTAL COMPAINES</Box>
          <h2 >{company_count}</h2>
        </Box> 
      </Box>   
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
  );
}
