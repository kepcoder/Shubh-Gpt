require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const authRouter = require('./routes/auth.route')
const chatRoute = require('./routes/chat.route')
const dbConnection = require('./db/db')
var cookieParser = require('cookie-parser')
const path = require('path')


app.use(cors({
    origin:[ "http://localhost:5173", "https://shubh-gpt.onrender.com/"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
dbConnection()
app.use(express.static(path.join(__dirname, '../public')))

app.use('/user', authRouter )
app.use('/user', chatRoute)


app.get('*name', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
module.exports = app
