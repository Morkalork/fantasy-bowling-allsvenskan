import { model } from "mongoose";
import { MatchInfo } from "../../scraper/types";
import { MatchInfoSchema } from "../schemas/match-info-schema";

export const MatchInfoModel = model<MatchInfo>("MatchInfo", MatchInfoSchema);
