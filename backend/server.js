require('dotenv').config()
const app = require('./src/app')
const { createServer } = require("http");
const initSocketServer = require("./src/socketServer/socket.server")


const httpServer = createServer(app);
initSocketServer(httpServer)

const PORT = process.env.PORT || 3000
httpServer.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})