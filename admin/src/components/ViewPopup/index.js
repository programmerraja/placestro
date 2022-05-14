import {React,useState} from "react";

import Popup from "../Popup";


function ViewPopup({view,setView,setShowPopup,open,title,saveView}) {
       
    return ( <>
                <Popup  onClose={()=>{setShowPopup(false)}} open={open} setShowPopup={setShowPopup} title={title} onSave={saveView}>
                <div  className="add_review-from">
                 <label forhtml="info" className="add_review-label">
                 <span>Name <span className="red_color">*</span></span></label>
                        <div className="add_review-input-wrapper">
                        <input  
                                className="add_review-input" 
                                type="text" 
                                name="info"  
                                value={view.name}
                                onChange={(e)=>{setView({...view,name:e.target.value});}}
                                ></input>
                       </div>
                 </div>

                 <div  className="add_review-from">
                 <label forhtml="info" className="add_review-label">
                 <span>Passed Out <span className="red_color">*</span></span></label>
                        <div className="add_review-input-wrapper">
                        <input  
                                className="add_review-input" 
                                type="text" 
                                name="info"  
                                value={view.passedOut}
                                onChange={(e)=>{setView({...view,passedOut:e.target.value});}}
                                ></input>
                       </div>
                 </div>
                 <div  className="add_review-from">
                 <label forhtml="info" className="add_review-label">
                 <span>Department<span className="red_color">*</span></span></label>
                        <div className="add_review-input-wrapper">
                        <input  
                                className="add_review-input" 
                                type="text" 
                                name="info"  
                                value={view.department}
                                onChange={(e)=>{setView({...view,department:e.target.value});}}
                                ></input>
                       </div>
                 </div>
                </Popup>
          </>);

}

export default ViewPopup;

