import {React,useState} from "react";

import Popup from "../Popup";

function getBase64(file, cb,notice) {
    
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb({...notice,image:reader.result})
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function NoticePopup({notice,setNotice,setShowPopup,open,title,saveNotice}) {
       
    return ( <>
                <Popup  onClose={()=>{setShowPopup(false)}} open={open} setShowPopup={setShowPopup} title={title} onSave={saveNotice}>
                <div  className="add_review-from">
                 <label forhtml="info" className="add_review-label">
                 <span>Information <span className="red_color">*</span></span></label>
                        <div className="add_review-input-wrapper">
                        <textarea  
                                className="add_info-textarea add_review-input" 
                                type="text" 
                                name="info"  
                                value={notice.info}
                                onChange={(e)=>{setNotice({...notice,info:e.target.value});}}
                                ></textarea>
                       </div>
                 </div>

                 <div  className="add_review-from">
                 <label forhtml="attendedOn" className="add_review-label">Image </label>
                       <div className="add_review-input-wrapper">
                        <input  type="file" 
                                placeholder=""  
                                name="image"  
                                className="add_review-input" 
                                onChange={(e)=>{getBase64(e.target.files[0],setNotice,notice)}}
                                />
                       </div>
                 </div>
                </Popup>
          </>);

}

export default NoticePopup;

