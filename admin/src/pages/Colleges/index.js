import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import swal from "sweetalert";
import {Box,Container} from "@material-ui/core";

import SquareLoader from "../../components/SquareLoader";

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

function Colleges(){
  const [college_lists,setCollegeLists]=useState([]);
//   const [cache_college_lists,setCacheCompanyLists]=useState([]);
//   const [college_lists,setCollegeLists]=useState([]);

  const[search_content,setSearchContent]=useState("");
  const[sort_by,setSortBy]=useState();
  const[filter_by,setFilterBy]=useState();


  const [loading,setLoading]=useState(true);
  let isFind=0;

  useEffect(()=>{
  	API.getCollegeList()
  	.then((res)=>{
		setLoading(false);
        if(res.data.status==="sucess"){
              setCollegeLists(res.data.list);
			//   setCacheCompanyLists([...res.data.list.company_list])
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
 
  const search=(val)=>{
  		setSearchContent(val);
  		college_lists.forEach((collegeObj)=>{
  			console.log(collegeObj.name.startsWith(val.toLowerCase()))
  			if(!collegeObj.name.toLowerCase().startsWith(val.toLowerCase())){
  				collegeObj.isShow=true;
  			}
  			else{
  				collegeObj.isShow=false;
  			}
  		})
  }

 const deleteCollege=(college_id)=>{
     swal({
      title: "Are you sure?",
      text: "You want to delete this company.",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        setLoading(true);
        API.deleteCollege(college_id)
        .then((res)=>{
            setLoading(false);
            if(res.data.status==="sucess"){
              let new_college=[]
              college_lists.forEach(college_obj=>{
                if(college_obj._id!=college_id){
                  new_college.push(college_obj)
                }
              });
              setCollegeLists(new_college);
              errorHandler(false,res.data.msg);
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
              </div>
	            	{
				    	 college_lists.length>0
				    	?
				    	(
				    		<div className="companies_content-wrapper">
					    		{college_lists.map((collegeObj,index)=>
					    		{
					    			if(!collegeObj.isShow){
					    				isFind=1;
						    			return(
						    				<div className="companies_content" key={collegeObj.name}>
						    				  <Link to={"/placestroAdmin/college/reviews/"+collegeObj._id} className="link flex2"> 
						    					<p className="companies_content-text ">{index+1}.{collegeObj.name}</p>
						    				  </Link>
						    					<p className="companies_content-review flex1">{collegeObj.noOfUsers}<i className="fas fa-user-friends"></i></p>
						    					<p className="companies_content-review flex1">{collegeObj.noOfReviews}<i className="fas fa-user-friends"></i></p>
												
                                                <div className="edit_icon icon">
													<Link to={"/placestroAdmin/edit/college/"+collegeObj._id}>
									             		 <i className="fas fa-edit" ></i>
													</Link>
									             </div>
												 <div className="edit_icon icon">
									             	 <i className="fas fa-trash-alt" onClick={()=>{deleteCollege(collegeObj._id)}}></i>
									             </div>
						    				</div>
						    			)
						    		}
					    		})

					    	}
					    	{!isFind && (<div className="companies_content">
						    					<p className="companies_content-text">No college find with name {search_content}</p>
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

export default Colleges;