import puppeteer from "puppeteer";
import { evaluateMatchIds } from "./evaluate-match-ids";
import { evaluatePlayerInfos } from "./evaluate-player-infos";
import { GamePlayerInfo } from "./types";

const URL =
  "https://bits.swebowl.se/elitserien-herrar?showAllDivisionMatches=true";

const getGameInfoUrl = (gameInfoId: string) =>
  `https://bits.swebowl.se/match-detail?matchid=${gameInfoId}`;

const scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(URL);
  await page.waitForSelector(".k-grid-content table tbody tr");
  page.on("console", (message) => {
    if (message.text().startsWith("JQMIGRATE") || message.type() !== "log") {
      return;
    }
    console.log(message.text());
  });

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
    playerInfos.push(...newPlayerInfos);
    console.log(
      `evaluatePlayerInfos: ${Math.floor((i / matchIds.length) * 100)}%`
    );
  }

  console.log("Done...");

  browser.close();
};

scraper();
