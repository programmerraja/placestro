import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import swal from "sweetalert";
import {Box,Container,Button} from "@material-ui/core";

import SquareLoader from "../../components/SquareLoader";
import CompanyCard from "../../components/CompanyCard";
import CompanyPopup from "../../components/CompanyPopup";


import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";

const querys={
	hrating:{value:"rating",type:-1},
	lrating:{value:"rating",type:1},
	hreview:{value:"noOfReviews",type:-1},
	lreview:{value:"noOfReviews",type:1},
	hname:{value:"name",type:-1},
	lname:{value:"name",type:1}
}

function Companies(){
  const [company_lists,setCompanyLists]=useState([]);
  const [cache_company_lists,setCacheCompanyLists]=useState([]);
  const [showPopup, setShowPopup] = useState(false);


  const[search_content,setSearchContent]=useState("");
  const[sort_by,setSortBy]=useState();
  const[filter_by,setFilterBy]=useState();

  const [id,setId]=useState("");

  const [name,setName]=useState("");
  const [rating,setRating]=useState("");
  const [noOfReviews,setReviews]=useState("");
  const [placedCount,setCompanyPlacedCount]=useState("");
  const [status,setStatus]=useState("VISTITED");
  const [campusType,setCampusType]=useState("onCampus");
  const [upcomingDate,setUpcomingDate]=useState("");
  const [lastVisitedDate,setLastVisitedDate]=useState("");
  const [isCreate,setIsCreate]=useState(true);


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
  const sortByRatingAsec=()=>{
	const new_list=[...company_lists];
	for(let i=0;i<new_list.length;i++){
		for (let j=i+1;j<new_list.length;j++){
			  if(new_list[i].rating/new_list[i].noOfReviews>
				 new_list[j].rating/new_list[j].noOfReviews){
				  let temp=new_list[i];
				  new_list[i]=new_list[j];
				  new_list[j]=temp;
			  }
		}
	}
	return new_list;
   }

	const sortByRatingDsec=()=>{
		const new_list=[...company_lists];
		for(let i=0;i<new_list.length;i++){
			for (let j=i+1;j<new_list.length;j++){
					if(new_list[i].rating/new_list[i].noOfReviews<
					new_list[j].rating/new_list[j].noOfReviews){
						let temp=new_list[i];
						new_list[i]=new_list[j];
						new_list[j]=temp;
					}
			}
		}
		return new_list;
	}

  const sortedCompanyList=(sort_by)=>{
  	if(sort_by){
	  	  let query={...querys[sort_by]}
		  if(querys[sort_by]["value"]==="rating"){
				let new_list=[]
				if(querys[sort_by]["type"]===1){
				new_list=sortByRatingAsec();
				}else{
				new_list=sortByRatingDsec();
				}
				setCompanyLists(new_list);
		  }
		  else{
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
 const editCompany=(companiesObj)=>{
	setShowPopup(true);
	setIsCreate(false);
	setId(companiesObj._id)
	setName(companiesObj.name)
	setCompanyPlacedCount(companiesObj.placedCount)
	setRating(companiesObj.rating);
	setReviews(companiesObj.noOfReviews)
	setStatus(companiesObj.status)
	setUpcomingDate(companiesObj.upcomingDate)
	setLastVisitedDate(companiesObj.lastVisitedDate)
	setCampusType(companiesObj.campusType)

 }
 const setEmpty=()=>{
	setId("")
	setName("")
	setCompanyPlacedCount("")
	setRating("");
	setReviews("")
	setStatus("VISITED")
	setUpcomingDate("")
	setLastVisitedDate("")
	setCampusType("onCampus")
 }
 const saveCompany=()=>{
	if(name){
        let promise;
        if(isCreate){
           promise=API.createCompany({name,rating,placedCount,noOfReviews,status,upcomingDate,lastVisitedDate,campusType})
        }else{
          promise=API.updateCompany({id,name,rating,placedCount,noOfReviews,status,upcomingDate,lastVisitedDate,campusType})
        }
        promise.then((res) => {
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
    errorHandler(true,"Plse provide company name")
    
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
			  <Box className="filter_option-wrapper">
                    <Button onClick={()=>{setShowPopup(true);setIsCreate(true);setEmpty()}} variant="contained">Create</Button>
              </Box>
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
						    				<CompanyCard companiesObj={companiesObj} editCompany={editCompany} deleteCompany={deleteCompany}/>
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
				{showPopup && isCreate && <CompanyPopup
								name={name}
								setName={setName}
								rating={rating}
								setRating={setRating}
								noOfReviews={noOfReviews}
								setReviews={setReviews}
								campusType={campusType}
								setCampusType={setCampusType}
								placedCount={placedCount}
								status={status}
								setStatus={setStatus}
								upcomingDate={upcomingDate}
								setUpcomingDate={setUpcomingDate}
								lastVisitedDate={lastVisitedDate}
								setLastVisitedDate={setLastVisitedDate}
								setCompanyPlacedCount={setCompanyPlacedCount}
								open={showPopup}
								setShowPopup={setShowPopup}
								saveCompany={saveCompany}
								title={"Create Company"}
							/>}
				{showPopup && !isCreate && <CompanyPopup
								name={name}
								setName={setName}
								rating={rating}
								setRating={setRating}
								noOfReviews={noOfReviews}
								setReviews={setReviews}
								campusType={campusType}
								setCampusType={setCampusType}
								placedCount={placedCount}
								status={status}
								setStatus={setStatus}
								upcomingDate={upcomingDate}
								setUpcomingDate={setUpcomingDate}
								lastVisitedDate={lastVisitedDate}
								setLastVisitedDate={setLastVisitedDate}
								setCompanyPlacedCount={setCompanyPlacedCount}
								open={showPopup}
								setShowPopup={setShowPopup}
								saveCompany={saveCompany}
								title={"Update Company"}
							/>}
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