export default function askQuestion(){
      let is_review_added=localStorage.getItem("is_review_added")?parseInt(localStorage.getItem("is_review_added")):0
      if(is_review_added<5){
        if(Math.random()>0.5){
            swal({text: "Are you placed?.",buttons: ["No", "Yes"]})
            .then((confirm) => {
                    if (confirm) {
                     swal({text:"Are you interseted in adding review", buttons: ["No", "Yes"]})
                     .then((confirm) => {
                        if (confirm) {
                          history.push("/user/addReview");
                        }else{
                          swal({text:"It's painfull for us\n please help other's by adding review.",buttons:["Don't care","Ok I will add"]})
                          .then((confirm)=>{
                            if (confirm) {
                                history.push("/user/addReview");
                            }
                          })  
                        }
                     })
                    }else{
                        swal({text:"Don't worry you will be placed soon.",button:"Yeah I will"})
                        localStorage.setItem("is_review_added",6)
                    }
            });
            localStorage.setItem("is_review_added",is_review_added+1);
        }
      }
  }