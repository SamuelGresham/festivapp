const path = require('path');

// Configure express.js
const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// Get route files
var auth = require('./routes/auth'); 

// Index route 
app.get('/', function(req, res) {
   res.render("index")
})

app.get('/login', auth.login);

app.get('/callback', auth.callback);

app.get('/home', )

app.listen(port, () => {
   console.log(`Express application now running on http://localhost:${port}`)
})

