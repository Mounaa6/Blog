const express = require("express");
const bodyparser = require("body-parser");
const session = require('express-session');
const path = require('path');

const app = express();

app.use(bodyparser.json());

const auth = require("./server/routings/auth");
app.use("/auth",auth);

const article = require("./server/routings/article");
app.use("/article",article);

const user = require("./server/routings/user");
app.use("/user",user);

app.listen(3000 , err => console.log("3000"))