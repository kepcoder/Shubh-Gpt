const { Server } = require("socket.io");
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.schema')
const messageModel = require('../models/message.model');
const {generateAiResponse, generateVector} = require('../services/ai.service')
const {saveVector, queryVector} = require('../services/pinconedb')
const cors = require('cors')

const initSocketServer = (httpServer)=>{
  const io = new Server(httpServer,{
    cors:{
      origin:'http://localhost:5173',
      credentials:true
    }
  });

  io.use( async (socket, next)=>{
     const cookies = cookie.parse(socket.handshake.headers?.cookie || '')
     if(!cookies.token){
       next(new Error("Authentication fail, No token found"))
     }

     try{
        const userId = jwt.verify(cookies.token, process.env.JWT_SECRET)     
        const user = await userModel.findById(userId.id)
        socket.user = user
        next()
     }catch(err){
       next(new Error('Authentication failed, No Token Available'))
     }

     
  })
 

io.on("connection", (socket) => {
  console.log('A User Connected')
  socket.on('user-message', async (data)=>{  
      //  Saving UserMessage to database
        const userMessage = await messageModel.create({
         user:socket.user._id,
         chat:data.chat,
         content:data.content,
         role:'user'
        })
         
        const userMessageVectorData = await generateVector(data.content)
          
        //search the similar userMessage on vector database
         const dataFromVector = await queryVector({
           queryVector:userMessageVectorData,
           limit:3,
           metadata:{
            chat:data.chat,
            userid:socket.user._id
           } 
         })
         

        //save user message in vector form to pnicone database
        await saveVector({
           vectorData:userMessageVectorData,
           messageId:userMessage._id,
           metadata:{
             userid:socket.user._id,
             chat:data.chat,
             text:data.content
           }
        })


        // Create chatHistory for Short term memory
        const chatHistory = await messageModel.find(
          {chat:data.chat}
        ).sort({createdAt:1}).limit(20).lean()

        // Short Term Memory
        const STM = chatHistory.map(item => {
          return {
            role:item.role,
            parts:[{text:item.content}]
          }
        })

        // Long Term Memory  
          const LTM = [
            {
              role:'user',
              parts:[{text:`
                I found some relevant past context from this chat:
                ${dataFromVector.map(item=>item.metadata.text).join("\n")}
                Use this along with recent conversation to generate a better response.
                `}]
            }
          ]

        // Giving chat Histry to LLM | Implementing Short Term Memory 
        const aiResponse = await generateAiResponse([...STM, ...LTM])
          // Saving Ai message to database
           const aiMessage = await messageModel.create({
           user:socket.user._id,
           chat:data.chat,
           content:aiResponse?aiResponse:"",
           role:'model'
           })


        // Converting Ai Response to vector data
         const aiResponseVectorData = await generateVector(aiResponse)

        // Saving Ai response vectordata to pnicone database 
          await saveVector({
           vectorData:aiResponseVectorData,
           messageId:aiMessage._id,
           metadata:{
             userid:socket.user._id,
             chat:data.chat,
             text:aiResponse
           }
        })

        socket.emit('ai-response',{
          content:aiResponse,
          chatId:data.chat
        })
  })
});

}


module.exports = initSocketServer


