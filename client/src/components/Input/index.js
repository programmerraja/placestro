import React from "react";


function Input({type,name,setName,list,placeholder}) {
return (
  <>  
     <input type={type?type:"text"}
            list="suggestion" 
            placeholder={placeholder?placeholder:""}  
            name="companyName"  
            className="add_review-input" 
            value={name}
            onChange={(e)=>{setName(e.target.value);}}
            />
      <datalist id="suggestion">
        {list.map((name)=>{
            return(<option value={name}/>)
        })}
       
      </datalist>
  </>
  );

}

export default Input;
