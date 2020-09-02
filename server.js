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

app.get('/api/timestamp', (req, res) => {
  let date = new Date();
  let unixTime = date.valueOf();
  let utcTime = date.toUTCString();
  res.json({
    unix: unixTime,
    utc: utcTime
  })
})

app.get("/api/timestamp/:date_string", (req, res) => {
  if (/\d{5,}/.test(req.params.date_string)) {
    dateInt = parseInt(req.params.date_string);
    res.json({ unix: req.params.date_string, utc: new Date(dateInt).toUTCString() });
  }

  let currentDate = new Date(req.params.date_string);
  if (currentDate.toString() === "Invalid Date") {
    res.json({
      error: "Invalid Date"
    });
  }
  res.json({
    unix: currentDate.valueOf(),
    utc: currentDate.toUTCString()
  });
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});