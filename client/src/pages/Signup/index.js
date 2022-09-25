import {React,useState,useEffect} from "react";
import {useHistory } from "react-router-dom";

import SquareLoader from  "../../components/SquareLoader";
  
import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

function Signup() {
   const [name,setName]=useState("");
  //  const [currentYears,setCurrentYeares]=useState([]);
   const [currentYear,setCurrentYear]=useState("");
   const [passedOut,setPassedOut]=useState("");


   const [department,setDepartment]=useState("CSE");
   const [email,setEmail]=useState("");

   const [password,setPassword]=useState("");

   const [linkdein,setLinkdeinUrl]=useState("");

   const [loading,setLoading]=useState("");

   const history = useHistory();


   function validate(){
      if(name && currentYear && department && email && password && passedOut){
        return true
      }
      return false;
   }
   function validateUrl(){
      if(linkdein && !linkdein.includes("linkdein.com")){
        errorHandler(true,"Please enter valid linkdein url");
        return false
      }
      if(linkdein && linkdein.includes("linkdein.com")){
        return true
      }
      return true
   }

   function siginUp(){
     if(validate()){
      if(validateUrl()){
       setLoading(true);
       API.signUp({name,email,currentYear,passedOut,department,linkdein,password})
       .then((res)=>{
              setLoading(false);
             if(res.data.status==="sucess"){
                errorHandler(false,"Plse check your email and verify it to add the review.");
                history.push("/signin");  
             }
             else{
                errorHandler(true,res.data.msg);
             }
       })
       .catch((res)=>{
         res=res.response;
         setLoading(false);
         errorHandler(true,res.data.msg);
        });
      }
     }else{
        errorHandler(true,"Fill all detail");
     }
  }


return ( <>
    <SquareLoader  loading={loading} msg={"Plse wait we creating account for you"}/>  
    <div className="signup_wrapper">
     <div className="signup_container">
        <div className="form_container">
            <div className="form_input">
              <label for="name"> Name <span className="red_color">*</span></label>
              <input type="text" name="name" required={true}  onChange={(e)=>{setName(e.target.value);}} value={name}/>
            </div>

            <div className="form_input">
              <label for="regno"> Current Year<span className="red_color">*</span></label>
              <input type="number" value={currentYear} onChange={(e)=>{setCurrentYear(e.target.value)}} />
            </div>

            <div className="form_input">
              <label for="regno"> Passed Out Year<span className="red_color">*</span></label>
              <input type="number" value={passedOut} onChange={(e)=>{setPassedOut(e.target.value)}} />
            </div>

            <div className="form_input">
              <label for="email"> Email<span className="red_color">*</span>
              <span className="sub_title">(College EmailId)</span></label>
              <input name="email" required={true} type="email" onChange={(e)=>{setEmail(e.target.value);}} value={email} />
            </div>

            <div className="form_input">
                <label for="department"> Department<span className="red_color">*</span> </label>
                <select name="department"  onChange={(e)=>{setDepartment(e.target.value);}}>
                  <option value="CSE">CSE</option>
                  <option value="MECH">MECH</option>
                  <option value="EEE">EEE</option>
                  <option value="ECE">ECE</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="OTHER">OTHER</option>
                </select>
            </div>

            <div className="form_input">
              <label for="linkdein"> Linkdein URL 
              <span className="sub_title">(Optional)</span></label>
              <input type="text" name="linkdein"  onChange={(e)=>{setLinkdeinUrl(e.target.value);}} value={linkdein} />
            </div>

            <div className="form_input">
            <label for="password"> Password <span className="red_color">*</span></label>
            <input type="password" name="password" required={true} onChange={(e)=>{setPassword(e.target.value);}} value={password} />
            </div>

            <div className="form_button">
            <input type="submit" name="login" value="Sign Up" className="signup" onClick={siginUp}/>
            </div>
             <div className="form_text">
               <small> Already have account? <a href="/signin"> Signin </a></small>
            </div>
        </div>
     </div>
    </div>
    </>);

}
export default Signup;