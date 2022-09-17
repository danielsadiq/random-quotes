const express = require('express');
const https = require('https');
const ejs = require('ejs')
const bodyParser = require('body-parser');
app = express();
app.engine('html', ejs.renderFile);
app.use(express.static('static_files'))
app.use(bodyParser.urlencoded({'extended':true}));


app.get('/', (req,res)=>{
    https.get('https://api.adviceslip.com/advice', (response)=>{
        response.on('data', (data)=>{
            const val = JSON.parse(data);
            res.render(__dirname + '/index.html', {id:val.slip.id, advice:val.slip.advice})
        })
    })
});


app.post('/again', (req,res) =>{
    res.redirect('/')
});


app.listen(3000, ()=>{
    console.log('This server is running');
});