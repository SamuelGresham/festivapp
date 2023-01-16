var querystring = require('querystring');
var request = require('request');

// Called when the user initiates the login process 
// Redirects to the spotify authentication site  
exports.login = function (req, res) {
   var state = "abc";
   var scope = 'user-read-private user-read-email';

   console.log("Redirecting")
   require('dotenv').config();
   res.redirect('https://accounts.spotify.com/authorize?' +
   querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI,
      state: state
   }));
}

exports.callback = function (req, res) {
   var code = req.query.code || null;
   var state = req.query.state || null;
   require('dotenv').config();

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
         redirect_uri: process.env.REDIRECT_URI,
         grant_type: 'authorization_code'
      },
      headers: {
         'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
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
      res.render("index", {
         title: "Welcome!",
         message: "Welcome to Festivapp, " + body.display_name
      })
      });
      } else {
         console.error("Authentication failed")
         res.render("Error")
      }
   })
}