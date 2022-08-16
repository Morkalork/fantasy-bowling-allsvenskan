import path from "path";
import express from "express";
import { scraper } from "./scraper";
import winston from "winston";
import expressWinston from "express-winston";

const app = express();
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

app.get("/", (req, res) => {
  console.log("Received request for /");
  res.sendFile(path.join(__dirname + "/../index.html"));
});

app.get("/scrape", (req, res) => {
  res.send("Scraping...");
  scraper().then(() => {
    res.send("Done!");
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("App 2 is now running at http://localhost:%d", PORT);
});

// scraper();
