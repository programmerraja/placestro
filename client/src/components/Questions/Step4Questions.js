import React from "react";


function Step4Questions({is_placed,setIsPlaced}) {
   
return ( <div className="question_wrapper">
                  <div  className="add_review-from">
                   <label for="isPlaced" className="add_review-label">
                   <span>Are you Placed in the company<span className="red_color"> *</span></span></label>
                         <div className="add_review-input-wrapper">
                           <select id="isPlaced" 
                                   className="add_review-input" 
                                   onChange={(e)=>{setIsPlaced(e.target.value);}}
                                   defaultValue={is_placed}>
                              <option value="1" >Yes</option>
                              <option value="0" >No</option>
                              <option value="2">Waiting</option>
                              <option value="-1">Not interset to share</option>
                            </select>
                         </div>
                   </div>
            
          </div>);

}

export default Step4Questions;