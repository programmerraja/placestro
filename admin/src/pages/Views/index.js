import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import {Box,Container,Button} from "@material-ui/core";


import SquareLoader from "../../components/SquareLoader";
import ViewPopup from "../../components/ViewPopup";


import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";



function NoticeBoard(){
	const[loading,setLoading]=useState(true);
	const[isCreate,setIsCreate]=useState(-1);

	const [views,setViews]=useState([])
	const [view,setView]=useState({})

	
	useEffect(()=>{
		API.getViews()
		.then((res) => {
            setLoading(false);
			setViews(res.data.views);
            setIsCreate(-1);
          })
          .catch((res) => {
            setLoading(false);
            setIsCreate(-1);
            errorHandler(true,res.data.msg); 
          });
	},[])
		
	
	const validViews=()=>{
		if(view.passedOut && view.department  ){
			return true
		}
		errorHandler(true,"Plse provide info for the notice")
	}

	const saveView=()=>{
		if(validViews()){
		    API.updateView(view).then((res) => {
				setLoading(false);
				errorHandler(false,res.data.msg); 
                setIsCreate(-1);
			  })
			  .catch((res) => {
				setLoading(false);
				errorHandler(true,res.data.msg); 
                setIsCreate(-1)
			  });
			return
		}
	}
	
	const deleteView=(id)=>{
		API.deleteView(id)
		.then((res) => {
			setLoading(false);
			let views=views.filter((view)=>{if(view._id!=id) {return view}});
			setViews(views);
			errorHandler(false,"Deleted!"); 
		  })
		  .catch((res) => {
			setLoading(false);
			errorHandler(true,res.data.msg); 
		  });
	}
	return ( 
	    <>
	    <SquareLoader  loading={loading}/>
		{isCreate>=1 && <ViewPopup saveView={saveView} view={view} setView={setView} open={isCreate==1 || isCreate==2} setShowPopup={(a)=>setIsCreate(-1)}/>}
		<div className="noticeboard_wrapper">
			<h1>Views </h1>
			
			<div className="noticeboard_container">
					{views.map((view,index)=>{
						return (<div className="notice">
								 	<div className="edit_icon">
										<i className="fas fa-edit" onClick={()=>{setIsCreate(2);setView(view)}}></i>
									</div>
									<h3> {view.name}</h3>
									<p className="notice_info">PassedOut:{view.passedOut}</p>
									<p className="notice_info">Department:{view.department}</p>
									<p className="notice_info">
                                        <Link to={`/placestroAdmin/companyview/${view._id}`}> View</Link>
                                        </p>
									<div className="edit_icon">
										<i className="fas fa-trash-alt" onClick={(e)=>{deleteView(view._id)}}></i>
									</div>
								</div>)
					})}
					{views.length===0 && !loading && (<h2>Nothing here ...</h2>)}
			</div>		
		</div>
		</>

        )
     
}

export default NoticeBoard;