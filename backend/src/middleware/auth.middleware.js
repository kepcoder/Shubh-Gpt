require('dotenv').config()
const userModel = require('../models/user.schema')
const jwt = require('jsonwebtoken')


const authMiddleware = async (req, res, next)=>{
  const {token} = req.cookies
  if(!token){
    return res.status(401).json({msg:"Unauthorized, Please Login"})
  }

  try{
            
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    req.user = user
    next()

  }catch(err){
    return res.status(401).json({msg:'Unauthorized'})
  }
} 

module.exports = authMiddleware