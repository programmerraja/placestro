import {useState,useEffect,React} from "react";
import {useParams,useHistory} from "react-router-dom";

import ReviewCard from "../../components/ReviewCard";
import SquareLoader from "../../components/SquareLoader";
import CardLoader from '../../components/CardLoader';

import API from "../../utils/API";
import errorHandler from "../../utils/errorHandler";
import askQuestion from "../../utils/askQuestion";

import "./style.css";


const querys={
  hrating:{value:"rating",type:-1},
  lrating:{value:"rating",type:1},
  latest:{value:"createdAt",type:-1},
  oldest:{value:"createdAt",type:1}
}

function Reviews({isLoggedin}){
  const [reviews,setReviews]=useState([]);
  const [company,setCompany]=useState("");

  const [cache_reviews,setCacheReviews]=useState([]);
  
  const [college_lists,setCollegeLists]=useState([]);

  const[sort_by,setSortBy]=useState();
  const[filter_by,setFilterBy]=useState();

  const [loading,setLoading]=useState(true);

  const { companyId } = useParams();
  const history=useHistory();

  useEffect(()=>{
    setLoading(true);
    API.getCompanyReviews(companyId)
    .then((res)=>{
        setLoading(false);
        if(res.data.status==="sucess"){
              setReviews(res.data.reviews);
              setCompany({...res.data.reviews[0].company})
              setCollegeLists(res.data.college_list);
              askQuestion(history)
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
  },[companyId,askQuestion])

  

  const filteredCollegeList=(filter_by)=>{
    if(filter_by){
       let query={college_id:filter_by,company_id:companyId}
       if(sort_by){
        query= {...query,...querys[sort_by]}    
       }
       API.getFilteredReviews(query)
        .then((res)=>{
          if(res.data.status==="sucess"){
            setReviews(res.data.reviews);
          }
          else{
            errorHandler(true,res.data.msg);
          }
        })
        .catch((res)=>{
        if(res.data && res.data.msg){
            errorHandler(true,res.data.msg);
        }else{
            errorHandler(true);
        }
        });
    }else{
      setReviews([...cache_reviews]);
    }
  }

  const sortedReviewsList=(sort_by)=>{
    if(sort_by){
      let query={company_id:companyId,...querys[sort_by]}
      if(filter_by){
          query["college_id"]=filter_by;
      }
      API.getSortedReviews(query)
      .then((res)=>{
          if(res.data.status==="sucess"){
              setReviews(res.data.reviews);
              setLoading(false);
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
  }

  const likeTheReview=(review_id)=>{
    if(review_id){
      API.likeTheReview(review_id)
    }else{
      history.push("/signin")
    }
  }

  return ( 
    <>
     
      <div className="review_wrapper">
        {
         (!loading && company)? 
         (
            <div className="companies_contents" key={company.name}>
              <p className="companies_content-text ">{company.name}</p>
              <p className="companies_content-rating ">{company.rating && company.noOfReviews?(company.rating/company.noOfReviews).toFixed(1):0}<i className="far fa-star"></i> </p>
              <p className="companies_content-review ">{company.noOfReviews}<i className="fas fa-user-friends"></i></p>
            </div>
          ):null
        }

        { ((!loading && reviews.length>0) || filter_by) &&
           <div>
            <div className="filter_option-wrapper">
              <label className="filter_option-label">
                       <span>Sort By: </span></label>
                       <select
                              className="filter_option" 
                              onChange={(e)=>{
                                setSortBy(e.target.value);
                                sortedReviewsList(e.target.value);}}>
                        <option value="">None</option>
                        <option value="hrating">Rating: High to Low</option>
                        <option value="lrating">Rating: Low to High</option>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                     </select>
            </div>
             <div className="filter_option-wrapper">
             <label className="filter_option-label">
                       <span>Filter by: </span></label>
                       <select className="filter_option" 
                               value={filter_by} 
                               onChange={(e)=>{
                               setFilterBy(e.target.value);
                               filteredCollegeList(e.target.value);}}>
                              <option value="">None</option>
                              {college_lists.map((college)=>{
                                return(<option key={college.code} value={college._id}>{college.name}</option>)
                                 })
                               }
                     </select>
                   </div>
          </div>
        }
         <CardLoader loading={loading} is_review={true}/>
        {
            !loading && reviews.map((review)=>{
              return(
                  <ReviewCard 
                      key={review._id}
                      {...review}
                      isLoggedin={isLoggedin} 
                      likeTheReview={likeTheReview} />
                ) 
            })
        }
        { 
          reviews.length==0 && !loading && !filter_by?
          <p className="review_info">This company has no reviews yet or reviews may be deleted 
          </p>:null  
        }
        {
           reviews.length==0 && !loading && filter_by?
          <p className="review_info">this college has no reviews try other college</p>:null  
        }
      </div>
        
    </>);

  }

export default Reviews;