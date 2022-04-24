import React from "react";
import {useState,useEffect,useRef} from "react";
import {useHistory,Link } from "react-router-dom";

import Loader from "../../components/Loader";
import QuestionCard from "../../components/QuestionCard";


import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";


import "./style.css";


function Exam(){
	const [questions,setQuestions]=useState([]);
	const [current_questions,setCurrentQuestions]=useState([]);
	const [current_title,setCurrentTitle]=useState([]);
	
	const steps=useRef(0);
	const [answers,setAnswers]=useState({})

	useEffect(()=>{
		API.getQuestion()
		.then((res)=>{
			if(res.data.status==="sucess"){
				setQuestions(res.data.question);
				setCurrentTitle(res.data.question[0])
				setCurrentQuestions(res.data.question[1])
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
	},[])
	const setAnswer=(answer,id)=>{
		setAnswers({...answers,[id]:answer});	
	}

	const submitAnswer=()=>{
		API.submitAnswer(answers)
		.then((res)=>{
				errorHandler(true,res.data.msg);
			})
		.catch((res)=>{
			if(res.data && res.data.msg){
				errorHandler(true,res.data.msg);
			}else{
				errorHandler(true);
			}
		});
	}
	const next=()=>{
		steps.current=steps.current+2;
		console.log(steps.current,questions)
		setCurrentTitle(questions[steps.current])
		setCurrentQuestions(questions[steps.current+1]);
	}
	const prev=()=>{
		steps.current=steps.current-2;
		setCurrentTitle(questions[steps.current])
		setCurrentQuestions(questions[steps.current-1]);
	}

	return (
		<>
			<div className="exam_wrapper">
					<h1 className="exam_heading">{current_title}</h1>
				{
					current_questions.map((questionObj,index) => {
						return (<QuestionCard questionObj={questionObj} index={index} setAnswer={setAnswer}/>)
					})
				}
				<div className="add_review-button exam_button">
						<button onClick={prev} className={steps.current===0?"hide":"show"}>Previous</button>
						{	
							steps.current==2?
							<button onClick={submitAnswer}>Submit</button>
							:
							<button onClick={next}>Next</button>

						}
				</div>
			</div>
		</>
	)
	

}

export default Exam;