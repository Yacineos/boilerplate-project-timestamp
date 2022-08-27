// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

app.get("/api/:dateOrTimeStamp", (req, res) => {
  const { dateOrTimeStamp } = req.params;
  if ((dateOrTimeStamp == "")) {
    var resToSend = {unix: Date.now(), utc: Date.getUTCDate()}
    res.json(resToSend);
  } else {
    if (dateIsValid(dateOrTimeStamp)) {
      var resToSend = {unix: dateOrTimeStamp.getTime(), utc: dateOrTimeStamp.toUTCString()};
      res.json(resToSend);
    } else {
      if (dateOrTimeStamp > 0 && dateOrTimeStamp < Date.now()) {
        var resToSend = {unix: dateOrTimeStamp, utc: dateOrTimeStamp.toUTCString()};
        res.json(resToSend);
      } else {
        res.status(400).json({ error: "Invalid Date" });
      }
    }
  }
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
