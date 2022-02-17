const User= require("./User")
const Companies= require("./Companies")
const Reviews= require("./Reviews")
const Colleges= require("./Colleges")
const fs = require("fs");


module.exports = {User,Companies,Reviews,Colleges};

// const user=require("../backup/user.json")
// const college=require("../backup/college.json")
// const company=require("../backup/company.json")
// const reviews=require("../backup/reviews.json")

// college.forEach((c)=>{
	// 	Colleges.create(c).then(()=>console.log("college created")).catch((e)=>console.log(e))
	// })

// user.forEach((c)=>{
//   User.create(c).then(()=>console.log("college created")).catch((e)=>console.log())
// })

// company.forEach((c)=>{
//   Companies.create(c).then(()=>console.log("college created")).catch((e)=>console.log(e))
// })

// reviews.forEach((c)=>{
//   Reviews.create(c).then(()=>console.log("college created")).catch((e)=>console.log(e))
// })


//for back up the data

// User.find({}).then((u)=>{
// fs.writeFile("../backup/user.json",JSON.stringify(u),"utf-8",(e)=>{console.log(e,"saved")})  
// })

// Companies.find({}).then((u)=>{
// fs.writeFile("../backup/company.json",JSON.stringify(u),"utf-8",(e)=>{console.log(e,"saved")})  
// })

// Reviews.find({}).then((u)=>{
// fs.writeFile("../backup/reviews.json",JSON.stringify(u),"utf-8",(e)=>{console.log(e,"saved")})  
// })
