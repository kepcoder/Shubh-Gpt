const app = require('./src/app')
const { createServer } = require("http");
const initSocketServer = require("./src/socketServer/socket.server")


const httpServer = createServer(app);
initSocketServer(httpServer)

httpServer.listen(3000,()=>{
    console.log("server is running on 3000")
})