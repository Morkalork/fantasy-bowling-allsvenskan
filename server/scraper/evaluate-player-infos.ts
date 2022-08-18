import { MatchInfo, PlayerInfo } from "./types";

const getScore = (row: Element, round: number): number => {
  const value = row.querySelector(`td:nth-child(${round + 1})`).textContent;
  if (!value) {
    return 0;
  }

  return parseInt(value, 10);
};

export const evaluatePlayerInfos = () => {
  const rows = document.querySelectorAll(
    ".matchdetail-player-scores table tr:not(.Grid_Header)"
  );

  // Get player data
  const playerInfos: PlayerInfo[] = [];
  rows.forEach((row) => {
    playerInfos.push({
      name: row.querySelector("td:nth-child(1)").textContent,
      seriesScore: [
        parseInt(row.querySelector("td:nth-child(2)").textContent),
        parseInt(row.querySelector("td:nth-child(3)").textContent),
        parseInt(row.querySelector("td:nth-child(4)").textContent),
        parseInt(row.querySelector("td:nth-child(5)").textContent),
      ],
      total: parseInt(row.querySelector("td:nth-child(6)").textContent),
      numberOfSeries: parseInt(
        row.querySelector("td:nth-child(7)").textContent
      ),
      points: parseInt(row.querySelector("td:nth-child(8)").textContent),
      gameRank: parseInt(row.querySelector("td:nth-child(9)").textContent),
    });
  });

  // Get match info
  const matchDataRow = document.querySelector(".match-data .row");
  const matchInfoScore = document
    .querySelector(".matchinfo-score")
    .textContent.split("-");
  const matchInfo: MatchInfo = {
    matchId: parseInt(
      matchDataRow
        .querySelector("div:nth-child(1)")
        .textContent.split(": ")
        .pop()
    ),
    round: parseInt(
      matchDataRow
        .querySelector("div:nth-child(3)")
        .textContent.split(" ")
        .pop()
    ),
    date: document.querySelector(".game-header-date").textContent,
    home: document.querySelector(".home-team .team-name").textContent,
    homeScore: parseInt(matchInfoScore[0]),
    away: document.querySelector(".away-team .team-name").textContent,
    awayScore: parseInt(matchInfoScore[1]),
  };

  return Promise.resolve({ playerInfos, matchInfo });
};
