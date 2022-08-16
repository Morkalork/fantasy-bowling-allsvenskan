import puppeteer from "puppeteer";
import { evaluateMatchIds } from "./evaluate-match-ids";
import { evaluatePlayerInfos } from "./evaluate-player-infos";
import { GamePlayerInfo } from "./types";

const URL =
  "https://bits.swebowl.se/elitserien-herrar?showAllDivisionMatches=true";

const getGameInfoUrl = (gameInfoId: string) =>
  `https://bits.swebowl.se/match-detail?matchid=${gameInfoId}`;

export const scraper = async () => {
  console.log("Launching scraper!");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-extensions",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (
      request.resourceType() === "xhr" &&
      request.url().startsWith("https://api.swebowl.se/api/v1/Match")
    ) {
      const newUrl = request.url().replace("seasonId=2022", "seasonId=2021");
      request.continue({
        url: newUrl,
      });
    } else {
      request.continue();
    }
  });
  page.on("console", (message) => {
    if (message.text().startsWith("JQMIGRATE") || message.type() !== "log") {
      return;
    }
    console.log(message.text());
  });

  await page.goto(URL);
  await page.waitForSelector(".k-grid-content table tbody tr");

  const matchIds = await page.evaluate(evaluateMatchIds);

  const playerInfos: GamePlayerInfo[] = [];
  for (let i = 0; i < matchIds.length; i++) {
    const matchId = matchIds[i];
    const gameInfoUrl = getGameInfoUrl(matchId);
    await page.goto(gameInfoUrl);
    await page.waitForSelector(
      ".matchdetail-player-scores table tr:not(.Grid_Header)"
    );

    const newPlayerInfos = await page.evaluate(evaluatePlayerInfos);
    console.log({ newPlayerInfos });
    playerInfos.push(...newPlayerInfos);
    console.log(
      `evaluatePlayerInfos: ${Math.floor((i / matchIds.length) * 100)}%`
    );
  }

  console.log("Scraper done...");

  browser.close();
};
