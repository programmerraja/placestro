import React from "react";
import {useState,useEffect} from "react";
import SquareLoader from  "../../components/SquareLoader";
import Input from  "../../components/Input";



import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import user from "../../img/user.svg";

const msg="Your profile is updating please wait."
const msg2="Please wait we getting Your profile."

function UserProfile() {
   const [name,setName]=useState("");
   const[department,setDepartment]=useState("");
   const[cgpa,setCGPA]=useState("");
   const[company_names,setCompanyName]=useState([]);
   const [noOfArrear,setNoOfArrear]=useState("");
   const [historyOfArrear,setHistoryOfArrear]=useState("");
   const [marks,setMarks]=useState({})
   const [passedOut,setPassedOut]=useState("");
   const [mobileNo,setMobileNo]=useState("");

   const [placedCompany,setPlacedCompany]=useState("");

   const [linkdein_url,setLinkdeinUrl]=useState("");

   const [old_password,setOldPassword]=useState("");
   const [new_password,setNewPassword]=useState("");

   const [loading,setLoading]=useState(true);

   const handleClick=()=> {
    setLoading(true)
    if(old_password){
        API.updateProfile({name,old_password,new_password,linkdein_url,cgpa,passedOut,noOfArrear,historyOfArrear,placedCompany,mobileNo,department,marks})
          .then((res)=>{
              setLoading(false);
              if(res.data.status==="sucess"){
                  errorHandler(false,res.data.msg);
              }else{
                  errorHandler(true,res.data.msg);
              }
          })
          .catch((res)=>{
             res=res.response;
             setLoading(false);
             errorHandler(true,res.data.msg);
          });
    }else{
      errorHandler(true,"plse provide old password");
    }
   }

   const getProfile=()=>{
    let res= API.getMyProfile()
    .then((res)=>{
      setLoading(false);
      if(res.data.status==="sucess"){
        setName(res.data.user.name);
        setLinkdeinUrl(res.data.user.linkdein);
        setDepartment(res.data.user.department);
        setPassedOut(res.data.user.passedOut);
        setHistoryOfArrear(res.data.user.historyOfArrear);
        setNoOfArrear(res.data.user.noOfArrear);
        setCGPA(res.data.user.cgpa);
        setMobileNo(res.data.user.mobileNo);
        setPlacedCompany(res.data.user.placedCompany);
        setCompanyName(res.data.company);
        setMarks(res.data.user.marks)
      }
    })
    .catch((res)=>{
        console.log(res)
        setLoading(false);
        if(res.data && res.data.msg){
              errorHandler(true,res.data.msg);
        }else{
              errorHandler(true);
        }
    });
    
   }
   
   useEffect(()=>{
      if(!name){
        getProfile();
      }
   },[])
return ( <>
          <SquareLoader  loading={loading} msg={loading==="initial"?msg2:msg}/>
          <div className="profile_container">
              <div className="form_container" >
               <div style={{display:"flex"}}>
                 <div style={{flex:"1"}}>
                  <div className="form_input">
                    <label for="name"> Name </label>
                    <input type="text" name="name" required={true} onChange={(e)=>{setName(e.target.value);}} value={name}/>
                  </div>
                  <div className="form_input">
                    <label for="department"> Department<span className="red_color">*</span> </label>
                    <select name="department"  onChange={(e)=>{setDepartment(e.target.value);}} defaultValue={department}>
                      <option value="CSE">CSE</option>
                      <option value="MECH">MECH</option>
                      <option value="EEE">EEE</option>
                      <option value="ECE">ECE</option>
                      <option value="CIVIL">CIVIL</option>
                      <option value="OTHER">OTHER</option>
                    </select>
            </div>

                  <div className="form_input">
                    <label for="name"> CGPA<span className="red_color">*</span> </label>
                    <input type="text" name="name" required={true} onChange={(e)=>{setCGPA(e.target.value);}} value={cgpa}/>
                  </div>

                  <div className="form_input">
                    <label for="name"> No Of Arrear<span className="red_color">*</span> </label>
                    <input type="text" name="name" required={true} onChange={(e)=>{setNoOfArrear(e.target.value);}} value={noOfArrear}/>
                  </div>
                  
                  <div className="form_input">
                    <label for="name"> history Of Arrear<span className="red_color">*</span> </label>
                    <input type="text" name="name" required={true} onChange={(e)=>{setHistoryOfArrear(e.target.value);}} value={historyOfArrear}/>
                  </div>

                  <div className="form_input">
                    <label for="name"> Passed Out <span className="red_color">*</span></label>
                    <input type="text" name="name" required={true} onChange={(e)=>{setPassedOut(e.target.value);}} value={passedOut}/>
                  </div>
                  <div className="form_input">
                    <label for="name"> Mobile No<span className="red_color">*</span> </label>
                    <input type="text" name="name" required={true} onChange={(e)=>{setMobileNo(e.target.value);}} value={mobileNo}/>
                  </div>
                  <div className="form_input">
                    <label for="name"> Placed Company</label>
                    <Input name={placedCompany} setName={setPlacedCompany} list={company_names}/>
                  </div>
                  <div className="form_input">
                   <label for="linkdein"> Linkdein URL </label>
                   <input type="text" name="linkdein"  onChange={(e)=>{setLinkdeinUrl(e.target.value);}} value={linkdein_url} />
                  </div>

                  <div className="form_input">
                    <label for="old_password"> Old Password<span className="red_color">*</span> </label>
                    <input type="old_password" name="old_password" placeholder="Old password" required="true" onChange={(e)=>{setOldPassword(e.target.value);}} value={old_password} />
                  </div>

                  <div className="form_input">
                    <label for="new_password"> New Password </label>
                    <input type="new_password" name="new_password" placeholder="New password" onChange={(e)=>{setNewPassword(e.target.value);}} value={new_password} />
                  </div>
              </div>
              <div style={{flex:"1"}}>
                  
                  
                  {Object.keys(marks).map(key=>{
                   return( <div className="form_input">
                    <label for="name"> {key} {key==="SSLC" || key==="HSSLC"?"mark":"GPA"}</label>
                    <input type="number" name="name" required={true} onChange={(e)=>{setMarks({...marks,[key]:e.target.value});}} value={marks[key]}/>
                  </div>)
                  })}
                 
                </div>
                </div>
                  <div className="form_button">
                      <input type="submit" name="update" value="Update My Account" className="update" onClick={handleClick}/>
                  </div>
              </div>
          </div>
          </>);

}

export default UserProfile;