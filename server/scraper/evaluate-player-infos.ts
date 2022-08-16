import { GamePlayerInfo } from "./types";

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

  const playerInfos: GamePlayerInfo[] = [];
  console.log("Evaluate player info!");
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
