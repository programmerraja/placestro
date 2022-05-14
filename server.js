const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const passport = require("./passport");
const routes = require("./routes");
const {sendWhoIs,sendReport} = require("./util/util");
const { spawn } = require('child_process');

const {PythonShell} =require('python-shell');

let options = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './python/', //If you are having python_test.py script in same folder, then it's optional.
  args: [''] //An argument which can be accessed in the script using sys.argv[1]
};





const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));  
// app.use(express.bodyParser({));
app.use(cors())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
  sendWhoIs(req);
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(express.static("admin/build"));
}

app.use(passport.initialize());
// use API routes here
app.use(routes);
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI,  {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify: false, 
  useCreateIndex: true
});

app.get("/model/python",(req,res)=>{
  //     const pyProg = spawn("pytho");
  //   // console.log(pyProg)
  //   pyProg.stdout.on('data', function(data) {
  //       // console.log(data.toString());
  //       res.write(data);
  //       res.end('end');
  //   });
  //   pyProg.stderr.on('data', function(data) {
  //     // console.log(data.toString());
  //     res.write(data);
  //     res.end('end');
  //   });
   PythonShell.run('machinelearning.py', options, function (err, result){
    if (err) throw err;
    // result is an array consisting of messages collected
    //during execution of script.
    console.log('result: ', result.toString());
    res.send(result.toString())
  });  
});

app.get("/PlacestroAdmin", (req, res) => {
  res.sendFile(path.join(__dirname, "./admin/build/index.html"));
});

app.get("/PlacestroAdmin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./admin/build/index.html"));
});
app.get("/report",(req,res)=>{
  sendReport(req.query.ques,true,req);
})
// Send every other request to the React app  
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
  sendWhoIs(req);
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});





