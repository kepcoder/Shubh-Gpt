require('dotenv').config()
const mongoose = require('mongoose')

const dbConnection = async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to database')
    }catch(err){
        console.log(err)
    }
}


module.exports = dbConnection