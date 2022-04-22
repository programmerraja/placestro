import React from "react";
import {Link } from "react-router-dom";

import "./style.css";

function QuestionCard({questionObj,index,setAnswer})  {
  return ( 
    <>
        <div className="company_container">
         <div className="wrapper">
                <p className="review_text-bold" dangerouslySetInnerHTML={{__html:`${index+1}.${questionObj.questionDesc}`}}>
                </p>
         </div>
          <div className="wrapper">
             <input type="text" className="answer_input" placeholder="Answer.." onChange={(e)=>{setAnswer(e.target.value,index)}}/>
          </div>
          
        </div>
    </>);

    }

export default QuestionCard;
