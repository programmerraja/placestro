import React from "react";

import "./style.css";



function Loader({loading}) {
  const li=[]
   for(let i=0;i<15;i++){
    li.push(<div className="lcompanies_content" key={i} >
              <p className="lcompanies_content-text"></p>
            </div>)
  }

  if(loading){
      return (
        <>
          <p className="text-small">Please wait while we fetching companies</p>
          <div className="companies_content-wrapper">
           {li}  
          </div>
        </>
      );
  }
  else{
    return null;
  }
}

export default Loader;