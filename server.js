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

  app.get('/', function (req, res) {
    res.send('Frontend App Status [Running]')
  })

  app.get('/new', function (req, res) {
    request('http://msg-processor:8080/payments', function(err, response, body){
      if (err) return console.log(err)
      console.log('Respons Is -->' + response.statusCode)
      console.log(body)
      res.render('main.ejs', {payments: JSON.parse(body)})
    });
  })

  app.post('/postPayment', (req, res) => {
    console.log(req.body)
    request.post({
      headers: {'content-type' : 'application/json'},
      url: 'http://msg-processor:8080/payment',
      body: JSON.stringify(req.body)
    }, function(error, response, body){
      if (error) return console.log(err)
      console.log('Message Published Successfully' + body);
      res.redirect('/new')
    });
  })
  
