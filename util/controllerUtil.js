const Answers = require("./questions/answers.json");

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
    getMarks:(answers)=>{
      console.log( Answers.length,"answeres")
      let mark=0;
      Object.keys(answers)
      .map((index)=>{
        if(answers[index].toUpperCase()===Answers[index].answer){
          mark+=1;
        }
      })
      return mark;
    }
}

module.exports=controllerUtil
