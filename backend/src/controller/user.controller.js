require('dotenv').config()
const userModel = require('../models/user.schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const chatModel = require('../models/chat.model')

const userRegisterController = async (req, res)=>{
  const {username, email, password} = req.body
  const user = await userModel.findOne({email})

  if(user){
     return res.status(409).json({msg:"Already register, Please Login"})
  }


  try{
    const newUser = await userModel.create({
        username, 
        email, 
        password: await bcrypt.hash(password, 10)
    }) 

    await chatModel.create({user:newUser._id, title:'First_Chat'})

    res.status(201).json({msg:'User Register Successfully'})


  }catch(err){
    return res.json({msg:'Some error Try to login again...'})
  }

}

const userLoginController = async (req, res)=>{
  const {email, password} = req.body

  const user = await userModel.findOne({email})
  if(!user){
    res.status(400).json({msg:"Invalid email or password"})
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword){
    return res.status(400).json({msg:'Inavlid Email or Password'})
  }
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
  res.cookie("token", token)  
  return res.status(200).json({msg:'login successFully'})
}

module.exports = {
    userRegisterController,
    userLoginController
}