const express = require('express');
const http = require('http');
const app = express();
const news = require('./routes/News')
const category = require('./routes/Category')
const tag = require('./routes/Tag')
app.get('/',(req,res)=>{
    res.send('sucess')
})
app.use("/tags",tag)
app.use("/news",news)
app.use('/category',category)
const port = process.env.PORT || 4000;
const server = http.createServer(app)
server.listen(port,()=>{
    console.log(`Sever is listening on the port ${port}`)
})