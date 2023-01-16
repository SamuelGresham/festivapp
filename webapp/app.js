// Configure express.js
const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'pug');

// Get route files
var auth = require('./routes/auth'); 

// Index route 
app.get('/', function(req, res) {
   res.redirect("/login")
})

app.get('/login', auth.login);

app.get('/callback', auth.callback);

app.listen(port, () => {
   console.log(`Express application now running on http://localhost:${port}`)
})

