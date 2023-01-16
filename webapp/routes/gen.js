var request = require("request");

exports.home = function (req, res) {
   var options = {
      url: 'https://api.spotify.com/v1/me',
      headers: {
         'Authorization': 'Bearer ' + req.query.token
      },
      json: true
   };
   request.get(options, function(error, response, body) {
      if (!body.error) {
         res.render("home", {
            name: body["display_name"], 
            profile_image_URL: body["images"][0]["url"]
         });
      } else {
         res.render("error", {
            error_code: body.error.status, 
            error_desc: body.error.message
         });
      }
   });
}