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


app.get("/api/:dateOrTimeStamp", (req, res) => {
  const { dateOrTimeStamp } = req.params;
  
  
    if (isNaN(dateOrTimeStamp)) {
      const utcDate = new Date(dateOrTimeStamp).toUTCString() 
      const unixNum = parseInt(new Date(dateOrTimeStamp).getTime());
      if(!unixNum){
       return res.json({ error: "Invalid Date" });
      }

      var resToSend = {unix: unixNum, utc: utcDate };
      res.json(resToSend);
      
    } else {
      const timestamp = parseInt(dateOrTimeStamp)
      if (timestamp >= 0 && timestamp <= Date.now()) {       
        
        var resToSend = {unix: timestamp, utc: new Date(timestamp).toUTCString()};
        res.json(resToSend);
      }
    
    }
  
});

app.get("/api/",(req, res)=>{
 
    var resToSend = {unix: Date.now(), utc: new Date().toUTCString()}
    res.json(resToSend);
    
  
})

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port 3000");
});
