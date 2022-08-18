export type PlayerInfo = {
  name: string;
  seriesScore: number[];
  total: number;
  numberOfSeries: number;
  points: number;
  gameRank: number;
};

export type MatchInfo = {
  matchId: number;
  round: number;
  date: string;
  home: string;
  homeScore: number;
  away: string;
  awayScore: number;
};
