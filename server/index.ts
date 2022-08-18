import path from "path";
import express from "express";
import { scraper } from "./scraper";
import winston from "winston";
import expressWinston from "express-winston";
import { connect } from "mongoose";

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
    console.log("SCRAPING COMPLETE!");
  });
});

app.listen(PORT, "0.0.0.0", async () => {
  const connectionString = `mongodb://mongodb:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}`;
  await connect(connectionString, {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    authSource: "admin",
  });
  console.log("App is now running at http://localhost:%d", PORT);
});

scraper();
