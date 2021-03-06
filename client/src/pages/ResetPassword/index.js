import {React,useState} from "react";
import {useParams} from "react-router-dom";

import SquareLoader from "../../components/SquareLoader";

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";

import reset from "../../img/reset.svg";

function ResetPassword() {
  const[loading,setLoading]=useState(false) 
  const [password,setPassword]=useState("");

  const { passwordId } = useParams();

  function sendResetPassword(){
    if(password ){
        setLoading(true);
        API.sendResetPassword({passwordId,password})
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
    }
    else{
        errorHandler(true,"Please Enter The Password");
    }
  }
return ( 
    <>
    <SquareLoader  loading={loading} msg={"Please wait we updating new password"}/>

    <div className="reset_container">

        <div className="reset_img">
        <img src={reset} />
        </div>

        <div className="reset_text">
        <h2> Change Password </h2>
        <p> Create a new, strong password that you don 't use for other websites. </p>

        <input type="password" name="password" className="reset_password" placeholder="Enter a new password"  onChange={(e)=>{setPassword(e.target.value);}}  value={password} />
        <input type="button" name="change_password" className="change_password" value="Change Password" onClick={sendResetPassword}/>
        </div>

        </div>
    </>
        );
}

export default ResetPassword;