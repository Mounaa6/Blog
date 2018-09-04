const express = require("express");
const bodyparser = require("body-parser");
const session = require('express-session');
const path = require('path');
var multer  = require('multer');
// const storage = multer.diskStorage({ dest: 'uploads/',
// filename: function(req, file, cb){
//     cb(null, file.filedname + '-' + Date.now() + path.extname(file.originalname))
// } });

// var upload = multer({
//     storage: storage
// }).single('avatar')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) 
    }
  })  

const mongoose = require("mongoose");

var upload = multer({ storage: storage });

const User = require("./server/models/user");
const UserModel = mongoose.model("users",User);

const app = express();

app.use(bodyparser.json());

const auth = require("./server/routings/auth");
app.use("/auth",auth);

const article = require("./server/routings/article");
app.use("/article",article);

const user = require("./server/routings/user");
app.use("/user",user);

app.post('/profile1', upload.single('file'), function (req, res) {
    req.body['imgProfilePath'] = req.file.path;
    UserModel(req.body).save(err => {res.send(err)});
  })

// app.post('/profile', (req, res) => {
//     upload(req, res, (err) => {
//         console.log(req.file);
//         UserModel(req.body).save(err => {res.send(err)});
//     });
// })


app.get('/uploads/:filename', (req,res)=>{
    res.sendFile(__dirname+'/uploads/'+req.params.filename);
});

app.listen(3000 , err => console.log("3000")); 