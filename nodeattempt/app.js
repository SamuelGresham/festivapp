var client_id = 'a6d4ca3ba6e24f8db9a617bad5854451';
var redirect_uri = 'http://localhost:3000/callback';

const express = require('express')
const app = express()
const port = 3000

const client_secret = "3451c5e4674649bf937ab0ffba583cbd"

var querystring = require('querystring');
var request = require('request'); // "Request" library


app.get('/login', function(req, res) {
  console.log("/login called")

  var state = "abc";
  var scope = 'user-read-private user-read-email';

  console.log("Redirecting")
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});


app.get('/callback', function(req, res) {
  console.log("/callback called")

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
  
      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/samuelgresham12',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  })

  res.send(req.query.code)
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

