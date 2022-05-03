import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import {Box,Container,Button} from "@material-ui/core";


import SquareLoader from "../../components/SquareLoader";
import NoticePopup from "../../components/NoticePopup";


import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";


function NoticeBoard(){
	const[loading,setLoading]=useState(false);
	const[isCreate,setIsCreate]=useState(-1);

	const [notices,setNotices]=useState([])
	const [notice,setNotice]=useState({})

	
	useEffect(()=>{
		API.getNotice()
		.then((res) => {
            setLoading(false);
			setNotices(res.data.notices);
          })
          .catch((res) => {
            setLoading(false);
            errorHandler(true,res.data.msg); 
          });
	},[])
		
	
	const validNotice=()=>{
		if(notice.info ){
			return true
		}
		errorHandler(true,"Plse provide info for the notice")
	}

	const saveNotice=()=>{
		if(validNotice()){
			let promise,new_notices;
			if(isCreate==1){
				promise=API.createNotice(notice);	
				new_notices=[...notices]
				new_notices.push({...notice,_id:"",postedBy:"You",createdAt:new Date()})
			}else{
				promise=API.updateNotice(notice);
			}
			promise.then((res) => {
				if(new_notices){
					console.log(new_notices)
					setNotices(new_notices);
				}
				setLoading(false);
				setIsCreate(0)
				errorHandler(false,res.data.msg); 
			  })
			  .catch((res) => {
				setLoading(false);
				setIsCreate(0)
				errorHandler(true,res.data.msg); 
			  });
			return
		}
	}
	
	const deleteNotice=(id)=>{
		API.deleteNotice(id)
		.then((res) => {
			setLoading(false);
			let new_notices=notices.filter((notice)=>{if(notice._id!=id) {return notice}});
			console.log(new_notices)
			// errorHandler(false,res.data.msg); 
			setNotices(new_notices);
		  })
		  .catch((res) => {
			setLoading(false);
			setIsCreate(-1)
			errorHandler(true,res.data.msg); 
		  });
	}
	return ( 
	    <>
	    <SquareLoader  loading={loading}/>
		{isCreate>=1 && <NoticePopup saveNotice={saveNotice} notice={notice} setNotice={setNotice} open={isCreate==1 || isCreate==2} setShowPopup={(a)=>setIsCreate(-1)}/>}
		<div className="noticeboard_wrapper">
			<div>
				<button className="swal-button analytic_btn" onClick={()=>{setIsCreate(1)}}>Create</button>
			</div>
			<div className="noticeboard_container">
					{notices.map((notice,index)=>{
						return (<div className="notice">
								 	<div className="edit_icon">
										<i className="fas fa-edit" onClick={()=>{setIsCreate(2);setNotice(notice)}}></i>
									</div>
									<h3>Notice {index+1}</h3>
									<p>{notice.info}</p>
									{notice.image && <img src={notice.image} className="notice_img"/>}
									<p className="notice_footer">{notice.postedBy}<br/> <span>{new Date(notice.createdAt).toDateString()}</span></p>

									<div className="edit_icon">
										<i className="fas fa-trash-alt" onClick={(e)=>{console.log(notice);deleteNotice(notice._id)}}></i>
									</div>
								</div>)
					})}
					{notices.length===0 && !loading && (<h2>Nothing here ...</h2>)}
			</div>		
		</div>
		</>

        )
     
}

export default NoticeBoard;