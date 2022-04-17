import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { 
    Box,
    Paper,
    Button,
    IconButton,
    makeStyles,
    Grid ,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Container
    } from "@material-ui/core";


import {Delete,Edit} from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";

import API from "../../utils/API";
import SquareLoader from "../../components/SquareLoader";
import AdminPopup from "../../components/AdminPopup";

import errorHandler from "../../utils/errorHandler";

import "./style.css";


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    backnext:{
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "10px"
    },
     head: {
      fontWeight: 'bold',
  },
  });  


let isFind=1;

function Admins(){
   
   const classes = useStyles();
   const [loading, setLoading] = useState(true);
   const [showPopup, setShowPopup] = useState(false);

   const[search_content,setSearchContent]=useState("");
   const [sortBy,setSortBy]=useState({department:""});

   const [admins,setAdmins]=useState([]);

   const [id,setId]=useState("");
   const [name,setName]=useState("");
   const [department,setDepartment]=useState("CSE");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const [admin_type,setAdminType]=useState("super admin");
   const [isCreate,setIsCreate]=useState(true);

   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [count, setCount] = useState(0);

   useEffect(() => {
    API.getAllAdmins(page, limit,sortBy)
      .then((res) => {
        setLoading(false);
        setAdmins(res.data.admins);
        setCount(res.data.count);
      })
      .catch((error) => {
        setLoading(false);
        setAdmins([]);
        
      });
   }, []);

   useEffect(() => {
    setLoading(true);
    API.getAllAdmins(page,limit,sortBy)
      .then((res) => {
        setLoading(false);
        setAdmins(res.data.admins);
        setCount(res.data.count);
      })
      .catch((error) => {
        setLoading(false);
        setAdmins([]);
        
      });
  }, [page,limit]);

   const deleteAdmin=(user_id)=>{
       swal({
      title: "Are you sure?",
      text: "You want to delete this review.",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        setLoading(true);
        API.deleteAdmin(user_id)
        .then((res)=>{
            setLoading(false);
            if(res.data.status==="sucess"){
              let new_admins=[]
              admins.forEach(user_obj=>{
                if(user_obj._id!=user_id){
                  new_admins.push(user_obj);
                }
              });
              setAdmins(new_admins);
              errorHandler(false,res.data.msg);
            }else{
              errorHandler(false,res.data.msg); 
            }
        })
        .catch((res)=>{
          setLoading(false);
          if(res.data && res.data.msg){
              errorHandler(true,res.data.msg);
          }else{
              errorHandler(true);
          }
        });
    }
    });
   }

  const sortAdmins=(sort_by)=>{
      setLoading(true);
      API.getAllAdmins(page,limit,sort_by)
      .then((res) => {
        setLoading(false);
        setAdmins(res.data.admins);
        setCount(res.data.count);
      })
      .catch((error) => {
        setLoading(false);
        setAdmins([]);
      });
  }
  const editAdmin=(id,name,email,department,admin_type)=>{
    setIsCreate(false);
    setShowPopup(true);
    setId(id);
    setName(name);  
    setEmail(email);
    setDepartment(department);
    setAdminType(admin_type);
  }
  const saveAdmin=()=>{
    console.log(name,email,password,department,admin_type)
    if(name && email  && department && admin_type && (password || !isCreate)){
        let promise;
        if(isCreate){
           promise=API.createAdmin({name,email,password,department,adminType:admin_type})
        }else{
            promise=API.updateAdmin({id,name,email,password,department,adminType:admin_type})
        }
        promise.then((res) => {
            setLoading(false);
            setShowPopup(false)
            errorHandler(false,res.data.msg); 
          })
          .catch((res) => {
            setLoading(false);
            setShowPopup(false)
            errorHandler(true,res.data.msg); 
          });
        return
    }   
    errorHandler(true,"Plse Fill all the data")
    
  }

  return (
    <div>
      <SquareLoader loading={loading} />  
      <Box m={5}>
        <Container maxWidth="false">
           <Box m={1}>
                <h3 >Admins</h3>
                <input type="text" 
                    className="companies_search" 
                    placeholder="Search here.."
                    value={search_content}
                    onChange={(e)=>{search(e.target.value)}}
                />
            </Box>
            <Box display="flex">
              
              <Box className="filter_option-wrapper">
                    <label className="filter_option-label"><span>Department: </span></label>
                              <select className="filter_option" 
                              onChange={(e)=>{
		                          	setSortBy({department:e.target.value});
		                          	sortAdmins({department:e.target.value})}}>
                                      <option value="">All</option>
                                      <option value="CSE">CSE</option>
                                      <option value="EEE">EEE</option>
                                      <option value="ECE">ECE</option>
                                      <option value="MECH">MECH</option>
                                      <option value="CIVIL">CIVIL</option>
                            </select>
              </Box>
              <Box className="filter_option-wrapper">
                    <Button onClick={()=>{setShowPopup(true);setIsCreate(true)}} variant="contained">Create</Button>
              </Box>
          </Box>
      {(admins.length>0 && !loading && isFind) &&
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left"  className={classes.head}>Name</TableCell>
                <TableCell align="left" className={classes.head}>Email</TableCell>
                <TableCell align="left" className={classes.head}>Department</TableCell>
                <TableCell align="left" className={classes.head}>Admin Type</TableCell>
                <TableCell align="left" className={classes.head}>Created At</TableCell>
                <TableCell align="left" className={classes.head}>Edit</TableCell>
                <TableCell align="left" className={classes.head}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((user) =>{
                 if(!user.isShow){
                    return (
                    <TableRow key={user._id} >
                      <TableCell align="left">{user.name}</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.department}</TableCell>
                      <TableCell align="left">{user.adminType}</TableCell>
                      <TableCell align="left">{new Date(user.createdAt).toDateString()}</TableCell>
                      <TableCell align="left" >
                            <IconButton className="delete_icon" aria-label="delete" onClick={()=>{editAdmin(user._id,user.name,user.email,user.department,user.adminType)}}>
                                <Edit/>
                            </IconButton>
                      </TableCell>
                      <TableCell align="left" >
                            <IconButton className="delete_icon" aria-label="delete" onClick={()=>deleteAdmin(user._id)}>
                                <Delete />
                            </IconButton>
                      </TableCell>
                      
                    </TableRow>
                    )
                 }
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      }
      {(admins.length===0 && !loading)  &&
            <h3>No Admins Found</h3>
      }
      {!isFind && 
          (<div className="companies_content">
						    	<p className="companies_content-text">No Admins find with name {search_content}</p>
					</div>)
      }
      {showPopup && isCreate &&  <AdminPopup  
                        setShowPopup={setShowPopup} 
                        open={showPopup} 
                        name={name} 
                        setName={setName}
                        department={department}
                        setDepartment={setDepartment}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        admin_type={admin_type}
                        setAdminType={setAdminType}
                        isCreate={isCreate}
                        title={"Create admin"}
                        saveAdmin={saveAdmin}
                        /> }

     {showPopup && !isCreate && <AdminPopup  
                        setShowPopup={setShowPopup} 
                        open={showPopup} 
                        name={name} 
                        setName={setName}
                        department={department}
                        setDepartment={setDepartment}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        admin_type={admin_type}
                        setAdminType={setAdminType}
                        isCreate={isCreate}
                        title={"Update admin"}
                        saveAdmin={saveAdmin}
                        /> }
    </Container>
    {count > limit ? (
        <Pagination
          className="d-flex justify-content-center"
          count={
            count % limit === 0 ? count / limit : Math.floor(count / limit) + 1
          }
          page={page}
          onChange={(e, v) => setPage(v)}
        />
      ) : null}
    </Box>
  </div>
  );
};

export default Admins;