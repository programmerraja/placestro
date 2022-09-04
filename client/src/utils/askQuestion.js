import axios from "axios";
import swal from "sweetalert";

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
                         axios.get("/report?ques=placed and try to add review")
                          history.push("/user/addReview");
                        }else{
                          swal({title:"😭",text:"It's painfull for us.Please help someone by sharing your interview process it take just 3min.",buttons:["I am Sorry","Ok I will add"]})
                          .then((confirm)=>{
                            if (confirm) {
                                axios.get("/report?type=placed and 2nd try to add review")
                                history.push("/user/addReview");
                            }
                            else{
                                axios.get("/report?type=placed Don't care")
                            }
                          })  
                        }
                     })
                    }else{
                        swal({title: "🤗",text:"You will be placed soon for your good heart❤️.",button:"Yeah I will"})
                        localStorage.setItem("is_review_added",6)
                        axios.get("/report?type=not placed")
                    }
            });
            localStorage.setItem("is_review_added",is_review_added+1);
        }
      }
  }

  export async function  askFeedBack(history){
  
    let is_feedback_given=localStorage.getItem("is_feedback_given")?parseInt(localStorage.getItem("is_feedback_given")):0
    if(is_feedback_given<5){
      if(Math.random()>0.5){
        swal({
          title: 'Feedback',
          text: "Do you want to say something to us? Any Feedback or appercations for us?",
          content: "input",
          button: {
            text: "Submit!",
          },
        }).then(function (feedback) {
           return axios.get(`/report?type=feedback ${feedback}`)
        }).then(()=>{
          swal({ text: "Thanks for feedback!"});
        })
        localStorage.setItem("is_feedback_given",is_feedback_given+1);
      }
    }
}
