const express = require('express')
const {join} = require('path')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
 
app.get('/',(req,res)=>{
res.sendFile(join(__dirname,'index.html'))
})


const io = new Server(server)

io.on('connection', (user) => {
    console.log('a user connected',user.id);
    user.on('disconnect', () => {
        console.log('user disconnected');
      })
      user.on('chat message',(msg)=>{
       console.log('message:',msg);
       io.emit('message',msg) 
      })
      user.on('started_typing',()=>{
        user.broadcast.emit('server_response')
      })
      user.on('stopped_typing',()=>{
        user.broadcast.emit('stop_response')
      })    
});  
    
server.listen(3000,()=>{
    console.log('riner server');
}) 
  