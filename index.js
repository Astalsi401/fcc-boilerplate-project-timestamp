// index.js
// where your node app starts

import express from "express";
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors from "cors";

// init project
const app = express();

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(`${import.meta.dirname}/views/index.html`);
});
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
const apiDate = (date) => {
  const resDate = /\d{13}/.test(date) ? new Date(parseInt(date)) : new Date(date);
  return isNaN(resDate)
    ? { error: "Invalid Date" }
    : {
        unix: resDate.getTime(),
        utc: resDate.toUTCString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        }),
      };
};
app.get("/api/:date", (req, res) => {
  res.json(apiDate(req.params.date));
});
app.get("/api", (req, res) => {
  res.json(apiDate(Date.now()));
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
