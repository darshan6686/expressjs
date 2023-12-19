const exp = require('constants');
const express = require('express');
const app = express();
const port = 1001;
const path = require('path');
const morgan = require('morgan');

// Middelware

app.use(express.static('public'));
// app.use(morgan('tiny'));
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use((req,res,next) => {
//     console.log(req.query);
//     if(req.query.password === '123'){
//         next();
//     }
//     else{
//         res.sendStatus(401);
//     }
// })


let auth = (req,res,next) => {
    // console.log(req.body);
    if(req.body.password === 123){
        next();
    }
    else{
        res.sendStatus(401);
    }
}

app.get('/', (req,res) => {
    res.json({type: 'Get Method'})
})
app.post('/',auth, (req,res) => {
    res.json({type: 'Post Method'})
})
app.put('/', (req,res) => {
    res.json({type: 'Put Method'})
})
app.patch('/', (req,res) => {
    res.json({type: 'Patch Method'})
})
app.delete('/', (req,res) => {
    res.json({type: 'Delete Method'});
})

app.get('/', (req,res) => {
    // console.log(req.method, req.ip, req.get('User-Agent'));

    // res.send('Hello world!');
    // res.json({type: 'Get Method'});
    // res.sendStatus(401);
    res.sendFile(path.join(__dirname, 'product.json'));
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})