const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'pug')

const client_secret = "3451c5e4674649bf937ab0ffba583cbd"

var querystring = require('querystring');
var request = require('request'); // "Request" library

// Get route files
var auth = require('./routes/auth'); 


app.get('/', function(req, res) {
  res.redirect("/login")
})

app.get('/login', auth.login);


app.get('/callback', auth.callback);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

