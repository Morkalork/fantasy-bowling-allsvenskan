import { GamePlayerInfo } from "./types";

export const evaluatePlayerInfos = () => {
  const rows = document.querySelectorAll(
    ".matchdetail-player-scores table tr:not(.Grid_Header)"
  );

  const playerInfos: GamePlayerInfo[] = [];
  rows.forEach((row, key) => {
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

  return Promise.resolve(playerInfos);
};
