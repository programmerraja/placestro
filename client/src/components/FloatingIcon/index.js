import React from "react";

import "./style.css";

function FloatingIcon({url,fbtype}) {
    console.log(fbtype)
      return(
          <>
          <div className={fbtype==="tg"?"floating_icon":"floating_icon2"}>
              <a href={url} target="_blank">
                    <i className={fbtype==="tg"?"fab fa-telegram":"fab fa-whatsapp"}></i>
                </a>
          </div>
      </>
        )
}

export default FloatingIcon;