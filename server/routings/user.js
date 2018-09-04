const router = require("express").Router()
const mongoose = require("mongoose");

const User = require("../models/user");
const Article = require("../models/article");
mongoose.connect("mongodb://localhost:27017/blogDb", {useNewUrlParser: true})
const UserModel = mongoose.model("users",User);
const ArticleModel = mongoose.model("articles",Article);

router.get("/all", async(req,res)=> {
    const result = await UserModel.find().exec();
    res.send(result);
})

router.get("/all/:id", async(req,res)=> {
    const result = await UserModel.findById(req.params.id).
    populate("Articles", "Title").sort({Date: 'descending'}).exec();
    res.send(result);
    
    
})

// router.get("/profile", async(req,res)=> {
//     UserModel(req.body).save(err => {res.send(err)}); 
// })


module.exports = router;