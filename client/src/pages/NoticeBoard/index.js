import React from "react";
import {useState,useEffect} from "react";


import SquareLoader from "../../components/SquareLoader";

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";


function NoticeBoard(){
	const[loading,setLoading]=useState(false);
	const [notices,setNotices]=useState([])

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
		
	
	
	return ( 
	    <>
	    <SquareLoader  loading={loading}/>
		<div className="noticeboard_wrapper">
            <h1>Notice Board </h1>
			<div className="noticeboard_container">
					{notices.map((notice,index)=>{
						return (<div className="notice">
								 	
									<h3>Notice {index+1}</h3>
									<p>{notice.info}</p>
									{notice.image && <img src={notice.image} className="notice_img"/>}
									<p className="notice_footer">{notice.postedBy}<br/> <span>{new Date(notice.createdAt).toDateString()}</span></p>
								</div>)
					})}
					{notices.length===0 && !loading && (<h5>Nothing here ...</h5>)}

			</div>		
		</div>
		</>

        )
     
}

export default NoticeBoard;