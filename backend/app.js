const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')
require("dotenv").config();
const app = express()


app.use(cors())
app.use(cookieParser())
app.use(express.json({limit : "50mb"}))
app.use(bodyParser.json({limit : "50mb"}))
app.use(bodyParser.urlencoded({
    limit : "50mb",
    extended:true,
    parameterLimit : 5000

}))


 const user =  require('./routes/userRoutes.js');              //    ---> create account , delete account , update account , search for users , follow an account
// const posts = require('./routes/post.js') ;                    //    --->  create post , like a  post , create a comment , create a reel
// const message = require('./routes/message.js')                 //    ---> send message , delete a message , 

app.use('/api/v1/' , user)
// app.use('/api/v1/' , posts)
// app.use('/api/v1/' , message)

module.exports=app
