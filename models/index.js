const User= require("./User")
const Admin= require("./Admin")
const Companies= require("./Companies")
const Reviews= require("./Reviews")
const Analytics=require("./Analytics")
const fs = require("fs");
// Analytics.findOneAndRemove({_id:"625a493c7d16419cd95f5a0b"}).then((a)=>{console.log(a)})

module.exports = {User,Companies,Reviews,Analytics,Admin};

// const user=require("../backup/user.json")
// const college=require("../backup/college.json")
// const company=require("../backup/company.json")
// const reviews=require("../backup/reviews.json")
let user=[
	// {id:"61b76016aecf39002991247d",name:"61a1af3bd1a0e900293e049b"},
	// {id:"61a46ad35a024a0029f4b32b",name:"61a19ff8d1a0e900293e040d"},
	// {id:"61a367f02c3fdb0029db14d0",name:"61a1a78dd1a0e900293e0460"},
	// {id:"61a367f02c3fdb0029db14d0",name:"61a4d5b1224d1d0029acb05a"},
	// {id:"61d7cf6a30752900294abd86",name:"61a1cd16d1a0e900293e051d"},
	// {id:"61c0bd6916c93300296002b8",name:"61b60727d232b10029512f78"},
	// {id:"61f733455d8b84002962e920",name:"61b70dbf43033f0029615295"},
	// {id:"61b79e445197e1002922845d",name:"61b798b45197e10029228441"},
	// {id:"61b842add9952f0029e90e44",name:"61b8409ad9952f0029e90e37"},
	// {id:"61c9c88eef4e99002903a767",name:"61cde5ce24dcaf00294af869"},
	// {id:"61b76016aecf39002991247d",name:"61d93bdeff97730029b46929"},
	// {id:"6240374274a73f0029e971ab",name:"61e0036827c13f00297fc633"},
]
// let obj=[]
// User.find({}).then((a)=>{a.forEach(b=>{
// 	obj.push({id:b._id});
// })
// obj.forEach((use)=>{
// 	User.findOneAndUpdate({_id:use.id},{passedOut:2022}).then(()=>{console.log("saved")})
// })
// // console.log(obj)
// })

// User.findOne({name:"K.boopathi"}).then((a)=>{console.log(a)});


// Reviews.findOneAndRemove({_id:"61c496518b932c00296398e0"}).then((a)=>console.log(a))
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

// User.findOneAndRemove({_id:"620fc43f85b631249a78dc6e"}).then((u)=>{})
// User.find().then((u)=>{
	// console.log(u)
// fs.writeFile("../backup/user.json",JSON.stringify(u),"utf-8",(e)=>{console.log(e,"saved")})  
// })

// Companies.find({}).then((u)=>{
// fs.writeFile("../backup/company.json",JSON.stringify(u),"utf-8",(e)=>{console.log(e,"saved")})  
// })

// Reviews.find({}).then((u)=>{
// fs.writeFile("../backup/reviews.json",JSON.stringify(u),"utf-8",(e)=>{console.log(e,"saved")})  
// })
