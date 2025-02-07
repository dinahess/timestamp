// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/:date?", (req, res) => {
  let dt;
  if (!req.params.date) {
    dt = new Date();
    return res.json({ unix: dt.getTime(), utc: dt.toUTCString() });
  }
  dt = new Date(req.params.date);
  if (!isNaN(Date.parse(dt))) {
    return res.json({ unix: dt.getTime(), utc: dt.toUTCString() });
  }
  else {
    dt = new Date(Number(req.params.date));
    if (!isNaN(Date.parse(dt))) {
      return res.json({ unix: dt.getTime(), utc: dt.toUTCString() });
    }
    else {
      return res.json({ error: dt.toString() });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
