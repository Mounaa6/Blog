const router = require("express").Router()
const mongoose = require("mongoose")

const Article = require("../models/article")
mongoose.connect("mongodb://localhost:27017/blogDb", {useNewUrlParser: true})
const ArticleModel = mongoose.model("articles",Article)

router.get("/all", async(req,res)=> {
    const result = await ArticleModel.find().sort({Date: 'descending'}).exec();
    result.forEach(function(myArticle) { 
        const date =  new Date(myArticle.Date);
        myArticle.Date = date.getDate() + '' + date.getMonth() + '' + date.getFullYear();
    });
    res.send(result);
})

router.post("/addArticle", (req,res)=>{
    req.body.Date = Date.now();
    ArticleModel(req.body).save(err => {res.send(err)});
})


module.exports = router;