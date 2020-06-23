// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//


// your 2nd API endpoint... 
app.get("/api/whoami", function (req, res) {
  var ipaddr = req.ip;
  var lang = req.headers["accept-language"];
  var user_info = req.headers["user-agent"];
  
  res.json({ipaddress: ipaddr,
           language: lang,
           software: user_info});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


//var string = req.method + " " + req.path + " - " + req.ip;

/*app.use(function middleware(req, res, next) {
  // Do something
  // Call the next function in line:
  next();
});*/