// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');

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

/* your first API endpoint */
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/* Timestamp endpoint API. Serves current date */
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

/* Timestamp endpoint API with date_string parameter. Serves input date's unix and utc  */
app.get("/api/timestamp/:date_string?", function(req, res){
  req.time_iso = req.params.date_string;
  if (moment(req.time_iso)){
    req.unix = new Date(req.time_iso).getTime();
    req.utc = new Date(req.time_iso).toUTCString();
  }
  if (/\d{5,}/.test(req.time_iso)){
    console.log("time unix input ");
    req.unix = req.time_iso;
    req.utc = new Date(parseInt(req.time_iso)).toUTCString();
    }
  if(!req.unix || req.utc === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  return res.json({ unix: req.unix, utc: req.utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
