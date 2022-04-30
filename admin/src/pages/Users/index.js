import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { 
    Box,
    Paper,
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

function Users(){
   
   const classes = useStyles();
   const [loading, setLoading] = useState(true);
   const[search_content,setSearchContent]=useState("");
   const [sortBy,setSortBy]=useState({department:"",passedOut:""});
   const [users,setUsers]=useState([]);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [count, setCount] = useState(0);

   useEffect(() => {
    API.getAllUsers(page, limit,sortBy)
      .then((res) => {
        setLoading(false);
        setUsers(res.data.users);
        setCount(res.data.count);
      })
      .catch((error) => {
        setLoading(false);
        setUsers([]);
        
      });
   }, []);

   useEffect(() => {
    setLoading(true);
    API.getAllUsers(page,limit,sortBy)
      .then((res) => {
        setLoading(false);
        setUsers(res.data.users);
        setCount(res.data.count);
      })
      .catch((error) => {
        setLoading(false);
        setUsers([]);
        
      });
  }, [page,limit]);

   const deleteUser=(user_id)=>{
       swal({
      title: "Are you sure?",
      text: "You want to delete this review.",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        setLoading(true);
        API.deleteUser(user_id)
        .then((res)=>{
            setLoading(false);
            if(res.data.status==="sucess"){
              let new_users=[]
              users.forEach(user_obj=>{
                if(user_obj._id!=user_id){
                  new_users.push(user_obj);
                }
              });
              setUsers(new_users);
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

  const search=(val)=>{
    let new_users=[...users]
    isFind=0;
    if(val===""){
      isFind=1;
    }
    new_users.forEach((usersObj)=>{
      if(!usersObj.name.toLowerCase().includes(val.toLowerCase())){
        usersObj.isShow=true;
      }
      else{
        isFind=1;
        usersObj.isShow=false;
      }
    })
    setUsers(new_users);
    setSearchContent(val);
  }
  const sortUsers=(sort_by)=>{
      setLoading(true);
      API.getAllUsers(page,limit,sort_by)
      .then((res) => {
        setLoading(false);
        setUsers(res.data.users);
        setCount(res.data.count);
      })
      .catch((error) => {
        setLoading(false);
        setUsers([]);
        
      });
  }

  return (
    <div>
      <SquareLoader loading={loading} />  
      <Box m={5}>
        <Container maxWidth="false">
           <Box m={1}>
                <h3 >All Students</h3>
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
		                          	setSortBy({...sortBy,department:e.target.value});
		                          	sortUsers({...sortBy,department:e.target.value})}}>
                                      <option value="">All</option>
                                      <option value="CSE">CSE</option>
                                      <option value="EEE">EEE</option>
                                      <option value="ECE">ECE</option>
                                      <option value="MECH">MECH</option>
                                      <option value="CIVIL">CIVIL</option>
                            </select>
              </Box>
              <Box className="filter_option-wrapper">
                    <label className="filter_option-label"><span>Passed Out Year: </span></label>
                              <select className="filter_option"
                               onChange={(e)=>{
		                          	setSortBy({...sortBy,passedOut:e.target.value});
		                          	sortUsers({...sortBy,passedOut:e.target.value})}}
                              >
                                      <option value="">All</option>
                                      <option value="2021">2021</option>
                                      <option value="2022">2022</option>
                                      <option value="2023">2023</option>

                            </select>
              </Box>
          </Box>
      {(users.length>0 && !loading && isFind) &&
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left"  className={classes.head}>Name</TableCell>
                <TableCell align="left" className={classes.head}>Email</TableCell>
                <TableCell align="left" className={classes.head}>Department</TableCell>
                <TableCell align="left" className={classes.head}>Email Verified</TableCell>
                <TableCell align="left" className={classes.head}>Reviews</TableCell>
                <TableCell align="left" className={classes.head}>SSLC</TableCell>
                <TableCell align="left" className={classes.head}>HSSLC</TableCell>
                <TableCell align="left" className={classes.head}>sem1</TableCell>
                <TableCell align="left" className={classes.head}>sem2</TableCell>
                <TableCell align="left" className={classes.head}>sem3</TableCell>
                <TableCell align="left" className={classes.head}>sem4</TableCell>
                <TableCell align="left" className={classes.head}>sem5</TableCell>
                <TableCell align="left" className={classes.head}>sem6</TableCell>
                <TableCell align="left" className={classes.head}>sem7</TableCell>
                <TableCell align="left" className={classes.head}>sem8</TableCell>
                <TableCell align="left" className={classes.head}>cgpa</TableCell>
                <TableCell align="left" className={classes.head}>noOfArrear</TableCell>
                <TableCell align="left" className={classes.head}>historyOfArrear</TableCell>
                <TableCell align="left" className={classes.head}>passedOut</TableCell>
                <TableCell align="left" className={classes.head}>placedCompany</TableCell>
                <TableCell align="left" className={classes.head}>mobileNo</TableCell>
                <TableCell align="left" className={classes.head}>Created At</TableCell>

                <TableCell align="left" className={classes.head}></TableCell>
                <TableCell align="left" className={classes.head}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) =>{
                 if(!user.isShow){
                    return (
                    <TableRow key={user._id} >
                      
                      <TableCell align="left">
                        <Link to={`/placestroAdmin/user/userReviews/${user._id}`}>
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.department}</TableCell>
                      <TableCell align="left">{user.isEmailVerified?"Yes":"No"}</TableCell>
                      <TableCell align="left">{user.numOfReviews}</TableCell>
                      <TableCell align="left">{user.marks?.SSLC}</TableCell>
                      <TableCell align="left">{user.marks?.HSSLC}</TableCell>
                      <TableCell align="left">{user.marks?.sem1}</TableCell>
                      <TableCell align="left">{user.marks?.sem2}</TableCell>
                      <TableCell align="left">{user.marks?.sem3}</TableCell>
                      <TableCell align="left">{user.marks?.sem4}</TableCell>
                      <TableCell align="left">{user.marks?.sem5}</TableCell>
                      <TableCell align="left">{user.marks?.sem6}</TableCell>
                      <TableCell align="left">{user.marks?.sem7}</TableCell>
                      <TableCell align="left">{user.marks?.sem8}</TableCell>
                      <TableCell align="left">{user.cgpa}</TableCell>
                      <TableCell align="left">{user.noOfArrear}</TableCell>
                      <TableCell align="left">{user.historyOfArrear}</TableCell>
                      <TableCell align="left">{user.passedOut}</TableCell>
                      <TableCell align="left">{user.placedCompany}</TableCell>
                      <TableCell align="left">{user.mobileNo}</TableCell>
                      <TableCell align="left">{new Date(user.createdAt).toDateString()}</TableCell>
                      <TableCell align="left" >
                      <IconButton className="delete_icon" aria-label="delete" >
                        <Link to={`/placestroAdmin/edit/user/${user._id}`}>
                          <Edit />
                        </Link>
                        </IconButton>
                          </TableCell>
                          <TableCell align="left" >
                      <IconButton className="delete_icon" aria-label="delete" onClick={()=>deleteUser(user._id)}>
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
      {(users.length===0 && !loading)  &&
            <h3>No Users Found</h3>
      }
      {!isFind && 
          (<div className="companies_content">
						    	<p className="companies_content-text">No users find with name {search_content}</p>
					</div>)
      }
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

export default Users;