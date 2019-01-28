console.log('Openshift Demo - Frontend')

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

var request = require('request')

app.set('view engine', 'ejs')

app.use(express.static('web'));
app.use(bodyParser.urlencoded({extended: true}))

app.listen(8080, function() {
    console.log('listening on 8080')
  })

  app.get('/status', function (req, res) {
    res.send('Frontend App Status [Running]')
  })

  app.get('/new', function (req, res) {
    res.sendFile(__dirname + '/main.html')
  })

  app.get('/', function (req, res) {
    //res.send('Hello World')
    request('http://msg-processor:8080/messages', function(err, response, body){
        if (err) return console.log(err)
        console.log('Respons Is -->' + response.statusCode)
        console.log(body)
        res.render('index.ejs', {messages: JSON.parse(body)})
    });
    //res.sendFile(__dirname + '/index.html')
  })

  app.post('/sendmsg', (req, res) => {
    console.log(req.body.message)
    request('http://msg-processor:8080/produce?msg='+ req.body.message, function(err, body){
        if (err) return console.log(err)
        console.log('Message Published Successfully')
        //console.log(body)
        res.redirect('/')
    });
  })


  app.post('/postPayment', (req, res) => {
    console.log(req.body.message)
  })
  
