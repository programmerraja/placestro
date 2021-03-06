
const controllerUtil={

		checkReview:(review)=>{
			if(review.name && review.attended_on && review.placement_type && review. rounds && review.rounds_detail){
				return true;
			}
			else{
				return false
			}
		},

		createReview:(review)=>{
			return   {
						            companyId:review.companyId,
                        userId:review.userId,
                        placementType:review.placement_type,
                        offCampusDetail:review.off_campus_detail,
                        attendedOn:review.attended_on,
                        rounds:review.rounds,
                        roundsDetails:review.rounds_detail,
                        isPlaced:review.is_placed,
                        rating:review.rating,
                        pros:review.pros,
                        cons:review.cons,
                        salary:review.salary,
                        role:review.role,
                        isAnonymous:review.is_anonymous
                    }
		},
    createNewReview:(review)=>{
          return  {
              placementType:review.placement_type,
              offCampusDetail:review.off_campus_detail,
              attendedOn:review.attended_on,
              rounds:review.rounds,
              roundsDetails:review.rounds_detail,
              isPlaced:review.is_placed,
              rating:review.rating,
              pros:review.pros,
              cons:review.cons,
              salary:review.salary,
              role:review.role,
              isAnonymous:review.is_anonymous
            }
    },
    getCollegeName:(college_code)=>{
        college_code=parseInt(college_code)
        if(college_code>=1102 && college_code<=4126){
          let colleges=require("./colleges/college1.json")
          let college_name=colleges[String(college_code)]
          if(college_name){
            return college_name
          }
          else{
            return false
          }
        }
        else if(college_code>=4127 && college_code<=6228){
          let colleges=require("./colleges/college2.json")
          let college_name=colleges[String(college_code)]
          if(college_name){
            return college_name
          }
          else{
            return false
          }
        }
        else if(college_code>=6229 && college_code<=7309){
          let colleges=require("./colleges/college3.json")
          let college_name=colleges[String(college_code)]
          if(college_name){
            return college_name
          }
          else{
            return false
          }
        }
        else if(college_code>=7311 && college_code<=9119){
          let colleges=require("./colleges/college4.json")
          let college_name=colleges[String(college_code)]
          if(college_name){
            return college_name
          }
          else{
            return false
          }
        }
        else if(college_code>=9120 && college_code<=9638){
          let colleges=require("./colleges/college5.json")
          let college_name=colleges[String(college_code)]
          if(college_name){
            return college_name
          }
          else{
            return false
          }
        }
    }
}

module.exports=controllerUtil
