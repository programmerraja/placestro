import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import swal from "sweetalert";
import {Box,Container} from "@material-ui/core";

import SquareLoader from "../../components/SquareLoader";
import CompanyCard from "../../components/CompanyCard";


import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";

const querys={
	hrating:{value:"rating",type:-1},
	lrating:{value:"rating",type:1},
	hreview:{value:"review",type:-1},
	lreview:{value:"review",type:1},
	hname:{value:"name",type:-1},
	lname:{value:"name",type:1}
}

function Companies(){
  const [company_lists,setCompanyLists]=useState([]);
  const [cache_company_lists,setCacheCompanyLists]=useState([]);

  const[search_content,setSearchContent]=useState("");
  const[sort_by,setSortBy]=useState();
  const[filter_by,setFilterBy]=useState();


  const [loading,setLoading]=useState(true);
  let isFind=0;

  useEffect(()=>{
  	API.getCompanyList()
  	.then((res)=>{
		setLoading(false);
        if(res.data.status==="sucess"){
              setCompanyLists(res.data.list.company_list);
			  setCacheCompanyLists([...res.data.list.company_list])
            //   setCollegeLists(res.data.list.college_list);
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

  const sortedCompanyList=(sort_by)=>{
  	if(sort_by){
	  	let query={...querys[sort_by]}
	  	API.getSortedCompanyList(query)
	  	.then((res)=>{
	        if(res.data.status==="sucess"){
	        	  setLoading(false);
	              setCompanyLists(res.data.list);
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
	}
  }
  const FilteredCollegeList=(filter_by)=>{
	if(filter_by){
		 let query={college_id:filter_by}
		 if(sort_by){
			  query= {...query,...querys[sort_by]}	 	
		 }
		 API.getFilteredCompanyList(query)
			  .then((res)=>{
				  if(res.data.status==="sucess"){
					  setCompanyLists(res.data.list);
				  }
				  else{
					  errorHandler(true,res.data.msg);
				  }
			  })
			  .catch((res)=>{
				if(res.data && res.data.msg){
						errorHandler(true,res.data.msg);
				}else{
						errorHandler(true);
				}
			  });
	}else{
		setCompanyLists([...cache_company_lists]);
	}
 }
  const search=(val)=>{
  		setSearchContent(val);
  		company_lists.forEach((companiesObj)=>{
  			console.log(companiesObj.name.startsWith(val.toLowerCase()))
  			if(!companiesObj.name.toLowerCase().startsWith(val.toLowerCase())){
  				companiesObj.isShow=true;
  			}
  			else{
  				companiesObj.isShow=false;
  			}
  		})
  }

 const deleteCompany=(company_id)=>{
     swal({
      title: "Are you sure?",
      text: "You want to delete this company.",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        setLoading(true);
        API.deleteCompany(company_id)
        .then((res)=>{
            setLoading(false);
            if(res.data.status==="sucess"){
              let new_company=[]
              company_lists.forEach(company_obj=>{
                if(company_obj._id!=company_id){
                  new_company.push(company_obj)
                }
              });
              setCompanyLists(new_company);
              errorHandler(false,res.data.msg);
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
    }
    });
  }

  if(!loading){
	  return ( 
	    <>
	    <SquareLoader  loading={loading}/>
			<div className="companies_container">
				<div className="companies_search-wrapper">
				 <input type="text" 
				 		className="companies_search" 
				 		placeholder="Search here.."
				 		value={search_content}
				 		onChange={(e)=>{search(e.target.value)}}
				 />
				 <div className="filter_option-wrapper">
						 <label className="filter_option-label">
		                   <span>Sort By: </span></label>
						   <select
		                          className="filter_option" 
		                          onChange={(e)=>{
		                          	setSortBy(e.target.value);
		                          	sortedCompanyList(e.target.value);}}>
			                  <option value="">None</option>
			                  <option value="hrating">Rating High to Low</option>
			                  <option value="lrating">Rating Low to High</option>
			                  <option value="hreview">Reviews High to Low</option>
			                  <option value="lreview">Reviews Low to High</option>
			                  <option value="lname">Name(asec)</option>
			                  <option value="hname">Name(desc)</option>
		                 </select>
	          </div>
	         {/* <div className="filter_option-wrapper">
						 <label className="filter_option-label">
		                   <span>Filter by: </span></label>
						  				 <select className="filter_option" 
						  				 				 value={filter_by} 
		                           onChange={(e)=>{
		                           setFilterBy(e.target.value);
		                           FilteredCollegeList(e.target.value);}}>
		                     	    <option value="">None</option>
		                     	    {college_lists.map((college)=>{
		                     		    return(<option key={college.code} value={college._id}>{college.name}</option>)
		                     	       })
		                           }
		                 </select>
	                 </div> */}
				 </div>
			    	{
				    	 company_lists.length>0
				    	?
				    	(
				    		<div className="companies_content-wrapper">
					    		{company_lists.map((companiesObj,index)=>
					    		{
					    			if(!companiesObj.isShow){
					    				isFind=1;
						    			return(
						    				<CompanyCard companiesObj={companiesObj}/>
						    			)
						    		}
					    		})

					    	}
					    	{!isFind && (<div className="companies_content">
						    					<p className="companies_content-text">No compaines find with name {search_content}</p>
						    				</div>)}
						   </div>
				    	)
				    	:
				    	(	
				    	<div className="companiesContainer">
				    		<p> No companies found</p>
				    	</div>
				    	)
			    }
			 </div>
			    
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

export default Companies;