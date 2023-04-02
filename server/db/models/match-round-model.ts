import { model } from "mongoose";
import { MatchRound } from "../../scraper/types";
import { MatchInfoSchema } from "../schemas/match-info-schema";

export const MatchRoundModel = model<MatchRound>("MatchInfo", MatchInfoSchema);
