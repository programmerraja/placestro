import swal from "sweetalert";

export default function errorHandler(isError,msg) {
	
	if(!isError){
		return swal({
              title: "Success",
              text: msg,
              icon: "success",
            });
	}else{
		if(!msg){
			msg="<p>Sorry something went wrong <br>Plse try again later.</p>\
				<a href='https://t.me/+8NyoSBK1PXUyZTk1' target='_blank'>\
					Report Us\
				</a>"
		}
		return swal({
              title: " ",
              content:{
              	element:"p",
              	attributes:{
              		innerHTML:msg,
              		className:"swal_text"
              	}
              	
              }
            });
	}
}