export default function askQuestion(history){
      let is_review_added=localStorage.getItem("is_review_added")?parseInt(localStorage.getItem("is_review_added")):0
      if(is_review_added<5){
        if(Math.random()>0.5){
            swal({title: "🤔",text: "Are you placed?.",buttons: ["No", "Yes"]})
            .then((confirm) => {
                    if (confirm) {
                     swal({title:"😍",text:"Congratulations🎉\nAre you like to help someone by sharing your interview process it take just 3min", buttons: ["No", "Yes"]})
                     .then((confirm) => {
                        if (confirm) {
                          history.push("/user/addReview");
                        }else{
                          swal({title:"😭",text:"It's painfull for us.Please help someone by sharing your interview process it take just 3min.",buttons:["Don't care","Ok I will add"]})
                          .then((confirm)=>{
                            if (confirm) {
                                history.push("/user/addReview");
                            }
                          })  
                        }
                     })
                    }else{
                        swal({title: "🤗",text:"You will be placed soon for your good heart❤️.",button:"Yeah I will"})
                        localStorage.setItem("is_review_added",6)
                    }
            });
            localStorage.setItem("is_review_added",is_review_added+1);
        }
      }
  }
