import {React,useState} from "react";
import { Button ,styled,Dialog,DialogContent,DialogActions,Typography,DialogTitle,IconButton} from "@material-ui/core";
import {Close} from "@material-ui/icons";

function Popup({children,setShowPopup,title,onSave}) {
       
    return (
            <>
                <Dialog open={open} onClose={()=>setShowPopup(false)} >
                        <DialogTitle style={{backgroundColor:"#0ab377"}}>{title}</DialogTitle>
                        <DialogContent style={{width:"500px"}}>
                            {children}
                        </DialogContent>
                        <DialogActions style={{backgroundColor:"#0ab377"}}>
                        <Button onClick={()=>setShowPopup(false)}>Cancel</Button>
                        <Button onClick={onSave}>Save</Button>
                        </DialogActions>
                    </Dialog>
            </>
    )

}



export default Popup;

