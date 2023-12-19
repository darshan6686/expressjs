const express = require('express');
const server = express();   // create server
const port = 7070;
// const server = http.createServer(()=>{});
const fs = require('fs');
const product = require('./product.json')

server.get ('/', (req, res) =>{
    res.send (product);
})
server.get ('/demo', (req, res)=>{
    res.send('Demo content');
})

server.listen(port,() => {
    console.log(`Server start at ${port}`);
})