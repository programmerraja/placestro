import React from "react";
import {useState,useEffect} from "react";
import {useHistory,Link } from "react-router-dom";
import {Box,Container,Button} from "@material-ui/core";

import SquareLoader from "../../components/SquareLoader";

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import "./style.css";


function SendMails(){
	const[loading,setLoading]=useState(false);
	const[department,setDepartment]=useState("");
	const[currentYear,setCurrentYear]=useState("");

	const[subject,setSubject]=useState("");
	const[body,setBody]=useState("");
	const[mails,setMails]=useState("")

	const getMails=(filter)=>{
		setLoading(true);
		API.getMails(filter)
		.then((res) => {
            setLoading(false);
			// res.data.mails
			setMails(res.data.mails.join(","))
          })
          .catch((res) => {
            setLoading(false);
            errorHandler(true,res.data.msg); 
          });
	}

	const validMails=(mails)=>{
		console.log(mails)
		if(mails[0]==''){
			errorHandler(true,"Plse provide mails")
			return false;
		}
		let inValidMails=mails.filter(mail=>!String(mail)
		.toLowerCase()
		.match(
		  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		))
		if(inValidMails.length>0){
			let msg=`Invalid Mails are \n ${inValidMails.join("\n")} \n Plse Enter Valid Email`
			errorHandler(true,msg);
			return false
		}
		return true
	}
	const validMailContent=()=>{
		if(subject && body){
			return true
		}
		errorHandler(true,"Plse provide subject and Mail body")
	}
	const sendMails=()=>{
		let tmails=mails.split(",")
		if(validMails(tmails) && validMailContent()){
			API.sendMails({subject:subject,body:body,mails:tmails})
			.then((res) => {
				setLoading(false);
				setMails(res.data.mails)
			  })
			  .catch((res) => {
				setLoading(false);
				errorHandler(true,res.data.msg); 
			  });
		}
	}

	return ( 
	    <>
	    <SquareLoader  loading={loading}/>
		<div class="companies_container">
			<h1>Send Mails </h1>
		<div className="mail_filter-wrapper">
				 <div className="filter_option-wrapper">
						 <label className="filter_option-label">
		                   <span>Department: </span></label>
						   <select className="filter_option" defaultValue={department} onChange={(e)=>{setDepartment(e.target.value);getMails({department:e.target.value,currentYear})}}>
			                  <option value="none">None</option>
							  <option value="all">All</option>
			                  <option value="CSE">CSE</option>
			                  <option value="EEE">EEE</option>
			                  <option value="ECE">ECE</option>
			                  <option value="MECH">MECH</option>
		                 </select>
	        	</div>
				<div className="filter_option-wrapper">
						 <label className="filter_option-label">
		                   <span>Current Year: </span></label>
						   <select className="filter_option" defaultValue={currentYear} onChange={(e)=>{setCurrentYear(e.target.value);getMails({currentYear:e.target.value,department})}}>
							 <option value="0">None</option>
							  <option value="all">All</option>
			                  <option value="1">1st</option>
			                  <option value="2">2nd</option>
			                  <option value="3">3rd</option>
			                  <option value="4">4th</option>
		                   </select>
	        	</div>
			</div>
			<div className="mail_body">
				<textarea rows="10" cols="20" placeholder="test@gmail.com,test2@gmail.com.." value={mails} onChange={(e)=>setMails(e.target.value)}></textarea>
				<textarea type="text" placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
				<textarea  
						placeholder="Body of the mail" 
						rows="17"
						cols="84" value={body} onChange={(e)=>{setBody(e.target.value)}}>
				</textarea>
				<button className="swal-button analytic_btn"onClick={sendMails} >Send Mail</button>
			</div>
		</div>
		</>

        )
     
}

export default SendMails;