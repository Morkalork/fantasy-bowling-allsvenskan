import { MatchInfo, PlayerInfo } from "./types";

export const evaluatePlayerInfos = () => {
  const rows = document.querySelectorAll(
    ".matchdetail-player-scores table tr:not(.Grid_Header)"
  );

  // Get match info
  const matchDataRow = document.querySelector(".match-data .row");
  const matchInfoScore = document
    .querySelector(".matchinfo-score")
    .textContent.split("-");

  const matchId = parseInt(
    matchDataRow.querySelector("div:nth-child(1)").textContent.split(": ").pop()
  );

  // Get player data
  const playerInfos: PlayerInfo[] = [];
  rows.forEach((row) => {
    // Name is stored as "Magnus Ferm (M123456)", so we split it and get the first part as name and the last part as license number
    const playerNameSegments = row
      .querySelector("td:nth-child(1)")
      .textContent.split("(");

    // Turn "(M123456)" into "M123456"
    const licenseNumber = playerNameSegments
      .pop() // The last part of ["Magnus", "Ferm", "(M123456)"]
      .slice(0, -2) // Remove the brackets
      .replace(/ /g, "");

    const playerName = playerNameSegments.pop();

    playerInfos.push({
      name: playerName,
      licenseNumber: licenseNumber,
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
      matchId,
    });
  });
  const matchInfo: MatchInfo = {
    matchId,
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
