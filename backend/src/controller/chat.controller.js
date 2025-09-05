const chatModel = require('../models/chat.model')
const messageModel = require('../models/message.model')

const createChatController = async (req, res)=>{
  const user = req.user
  const {title} = req.body
     
  const chats = await chatModel.create({
    user:user._id,
    title
  })

  return res.status(201).json({
    msg:'Chat created successfully',
    chat:{
        user:chats._id,
        title:chats.title,
        lastActvity:chats.lastActivity
    }
  })
}

const fetchChatController = async (req, res)=>{
  
  try{

     const userId = req.user._id;
     const chats = await chatModel.find({user:userId}) 
     return res.status(200).json({ msg:'chats fetch sucessfull', chats })

   }catch(err){
    res.status(500).json({msg:"failed to Fetch Chats"})
   }
   
}

const fetchMessagesController = async(req,res)=>{
 
  const id = req.params.id
  console.log(id)
  try{
  
     const allMessages = await messageModel.find({chat:id})

     if(!allMessages){
      return res.status(404).json({ msg: "No messages found" });
     }

     return res.json(allMessages);

  }catch(err){
     return res.status(404).json({msg:'something error'})
  }
   
}

module.exports = {
  createChatController,
  fetchChatController,
  fetchMessagesController
}