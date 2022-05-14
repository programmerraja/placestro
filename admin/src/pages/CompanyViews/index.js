import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { 
    Box,
    Paper,
    makeStyles,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Container,
    } from "@material-ui/core";

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

function CompanyView(){
   
   const classes = useStyles();
   const [loading, setLoading] = useState(true);
   const[search_content,setSearchContent]=useState("");
   const [users,setUsers]=useState([]);
   const [viewsName,setViewsName]=useState("....");
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [count, setCount] = useState(0);

   const {viewId}=useParams();


   useEffect(() => {
    setLoading(true);
    API.getViewUsers(viewId,page,limit)
      .then((res) => {
        setLoading(false);
        setUsers(res.data.users);
        setCount(res.data.count);
        setViewsName(res.data.viewName);
      })
      .catch((error) => {
        setLoading(false);
        setUsers([]);
        
      });
  }, [page,limit]);

   
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
  
  return (
    <div>
      <SquareLoader loading={loading} />  
      <Box m={5}>
        <Container maxWidth="false">
           <Box m={1}>
                <h3 >{viewsName}</h3>
                <input type="text" 
                    className="companies_search" 
                    placeholder="Search here.."
                    value={search_content}
                    onChange={(e)=>{search(e.target.value)}}
                />
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
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) =>{
                 if(!user.isShow){
                    return (
                    <TableRow key={user._id} >
                      <TableCell align="left">
                          {user.name}
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
            <h3>No Students Found</h3>
      }
      {!isFind && 
          (<div className="companies_content">
				<p className="companies_content-text">No Students find with name {search_content}</p>
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

export default CompanyView;