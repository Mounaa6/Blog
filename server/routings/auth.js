const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const user = require("../models/user");
const article = require("../models/article");

mongoose.connect("mongodb://localhost:27017/blogDb", {useNewUrlParser: true})

const UserModel = mongoose.model("users", user);
const ArticleModel = mongoose.model("articles", article);

router.post("/login", async (req, res) => {
    const result = await UserModel.findOne({username: req.body.username }).exec();
    if(result) {
        const comp = bcrypt.compareSync(req.body.password, result.password);
        if(comp){
            const token = jwt.sign({data: result}, 'mypass123')
            res.send({message: "user found", token: token })
        }else {
            res.send({message: "bad password"})
        }
    }else {
        res.send({message: "user not found"})
    }
    // res.send(result);
})


router.post("/register", (req, res) => { 
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    UserModel(req.body).save(err => {res.send(err)});
})

module.exports = router;
