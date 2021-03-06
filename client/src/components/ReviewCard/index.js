import {React,useState} from "react";
import {Link } from "react-router-dom";

import userImg from "../../img/user.svg";

import "./style.css";

function ReviewCard({_id,placementType,offCampusDetail,rounds,roundsDetails,
                    attendedOn,isPlaced,rating,pros,cons,salary,mobileNo,role,user,
                    myCompany,createdAt,isEditing,deleteReview,isLoggedin,likes=[],likeTheReview}){

  const [isLiked,setIsLiked]=useState(user.isLiked)
  const[likes_count,setLikesCount]=useState(likes.length)

  const likeReview=()=>{
    if(isLoggedin){
      likeTheReview(_id)
      if(isLiked){
        setLikesCount((likes_count)=>likes_count-1);
      }else{
        setLikesCount((likes_count)=>likes_count+1);
      }
      setIsLiked((isLiked)=>!isLiked);
    }
    else{
      likeTheReview(false)
    }
  }

  return ( 
    <>
        <div className="review_container">
        {myCompany && myCompany.name && 
          <p className="company_name margin-0">
            {myCompany.name}
          </p>
        }
        <div className="wrapper">
        {createdAt &&
          <p className="created_at">
            Posted on {new Date(createdAt).toDateString()}
          </p>
        }
        {isEditing &&
          <div className="edit_icon">
            <Link to={`/user/edit/review/${_id}`}>
             <i className="fas fa-edit"></i>
            </Link>
          </div>
        }
          <div  className="user_wrapper">
              <div className="d-flex">
                <img src={userImg} alt="user" className="user_img"/>
                {isPlaced===1 &&
                <span className="user_text-green">Placed</span>
                }
                {isPlaced===2 &&
                  <span className="user_text-green">Waiting</span>
                }
                {rating &&
                  <span className="user_text rating">
                  {rating.toFixed(1)}
                  <i className="far fa-star"></i></span>
                }
              </div>
            <p className="user_name">{user.name}
             {user.department && 
                <span className="user_text-small-yellow">({user.department})</span>
             } 
             </p>
            {user.college_name && 
              <span className="user_text-small">{user.college_name}</span>
            }
          </div>
        </div>

          <div className="wrapper">
            <div className="review_text">
              <p className="margin-0 review_text-bold">Attended on(year):
                <span className="">
                 {attendedOn}</span>
              </p>
            </div>
            <div className="review_text ">
            <p className="review_text-bold">placement type:
              <span className="">
               {placementType}</span>
            </p>
            </div>
            {offCampusDetail && <div className="review_text">
                                  <p className="review_text-bold">offCampus Detail:
                                    <span >
                                    {offCampusDetail}</span>
                                  </p>
                                </div>
            }
            <p className="review_text-bold">Interview Process</p>
            <div className="padding">
              <div className="review_text">
                <p className="review_text-bold">No of rounds: 
                    <span >{rounds}</span>
                </p>
              </div>
              {
                Object.keys(roundsDetails).map((roundName,index)=>{
                  return(
                    <div className="review_rounds" key={roundName+_id}>
                    <details>
                        <summary className="review_text-bold round_name" >
                        {index+1}.{roundName}</summary>
                      <div className="review_text">
                      {
                        roundsDetails[roundName]
                        .split("\n")
                        .map((text,index)=>{
                              return(<p key={index+_id} className="review_text-point">{text}</p>)
                         })
                      }
                      </div>
                    </details>
                    </div>
                    )
                })
              }
            </div>
          </div>
          <div className="wrapper">
            {pros && 
              <div className="review_text">
                <p className="review_text-bold">pros:</p>
                {
                        pros
                        .split("\n")
                        .map((text,index)=>{
                              return(<p key={index+_id} className="review_text-point">{text}</p>)
                         })
                }
              </div>
            }
            {cons && 
              <div className="review_text">
                <p className="review_text-bold">cons:</p>
                {
                        cons
                        .split("\n")
                        .map((text,index)=>{
                              return(<p key={index+_id} className="review_text-point">{text}</p>)
                         })
                }
              </div>
            }
          </div>

              
          <div className="wrapper">
            { salary && 
                <div className="review_text">
                  <p className="review_text-bold">Salary:<span>{salary}</span></p>
                </div>
            }
            {role && 
                <div className="review_text">
                  <p className="review_text-bold">Role:<span>{role}</span></p>
                </div>
            }
            {user.linkdein &&
                <div className="review_text">
                  Contact:{" "} 
                  <a href={user.linkdein} className="review_link">
                   <i className="fab fa-linkedin-in" ></i>
                  </a>
                </div>
            }
          </div>
           {likeTheReview && <div>
               <button onClick={likeReview} className={isLiked?"reviewcard_like-icon liked":"reviewcard_like-icon"}>
                <i className="fas fa-thumbs-up " ></i>
               </button>
               {" "}{likes_count}
              </div>
            }
          {isEditing &&
            <div className="edit_icon">
              <i className="fas fa-trash-alt" onClick={()=>{deleteReview(_id)}}></i>
            </div>
          }
        </div>
    </>);

    }

export default ReviewCard;
