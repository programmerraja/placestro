import React,{useState} from "react";
import { IconButton } from "@material-ui/core";
import "./style.css"
import { Link } from 'react-router-dom'
import { Menu, Settings, Home ,Business,Apps} from "@material-ui/icons";
// import AppsIcon from '@mui/icons-material/Apps';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleIcon from '@material-ui/icons/People';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EmailIcon from '@material-ui/icons/Email';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={!expanded?"sidebar position-fixed":"expanded sidebar position-fixed"}>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <IconButton onClick={()=>expanded?setExpanded(false):setExpanded(true)}>
          <Menu />
        </IconButton>
      </div>
      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin" className='menu-bars'>
          <Home className='icons'/>
          <span className='sidebar-text'>Home</span>
        </Link>:<Link to ="/placestroAdmin/home" ><Home className="icon-collapsed"/></Link>}
      </div>

      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin" className='menu-bars'><PeopleIcon className='icons'/>
          <span className='sidebar-text'>Students</span>
        </Link>:<Link to ="/placestroAdmin/users"><PeopleIcon className="icon-collapsed"/></Link>}
      </div>

      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin" className='menu-bars'><Business className='icons'/>
          <span className='sidebar-text'>Companies</span>
        </Link>:<Link to ="/placestroAdmin/companies"><Business className="icon-collapsed"/></Link>}
      </div>
      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin" className='menu-bars'><Apps className='icons'/>
          <span className='sidebar-text'>Analytics</span>
        </Link>:<Link to ="/placestroAdmin/Analytics"><Apps className="icon-collapsed"/></Link>}
      </div>
      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin" className='menu-bars'><PeopleIcon className='icons'/>
          <span className='sidebar-text'>Admins</span>
        </Link>:<Link to ="/placestroAdmin/admins"><PeopleIcon className="icon-collapsed"/></Link>}
      </div>
      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin/notice" className='menu-bars'><BorderColorIcon className='icons'/>
          <span className='sidebar-text'>Notice Board</span>
        </Link>:<Link to ="/placestroAdmin/notice"><BorderColorIcon className="icon-collapsed"/></Link>}
      </div>
      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin" className='menu-bars'><PeopleIcon className='icons'/>
          <span className='sidebar-text'>Send Mail</span>
        </Link>:<Link to ="/placestroAdmin/sendMails"><EmailIcon className="icon-collapsed"/></Link>}
      </div>
      <div className='Sidemenu'>
        {expanded?<Link to="/placestroAdmin" className='menu-bars'><PeopleIcon className='icons'/>
          <span className='sidebar-text'>Views</span>
        </Link>:<Link to ="/placestroAdmin/views"><EmailIcon className="icon-collapsed"/></Link>}
      </div>
      <div className='Sidemenu'>
        {expanded?<Link to="/logout" className='menu-bars'><ExitToAppIcon className='icons'/>
          <span className='sidebar-text'>Logout</span>
        </Link>:<Link to ="/placestroAdmin/user/logout"><ExitToAppIcon className="icon-collapsed"/></Link>}
      </div>

    </div>
  );
}
