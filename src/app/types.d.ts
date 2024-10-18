import { StringDecoder } from "string_decoder";

interface MatchInfo {
  id: string;
  away_team: string;
  commence_time: string;
  home_team: string;
  sport_key: string;
  sport_title: string;
  img_home?: string;
  img_away?: string;
}

interface OddInfo {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: BookmakerInfo[];
}

interface BookmakerInfo {
  key: string;
  title: string;
  markets: MarketsInfo[];
}

interface MarketsInfo {
  key: string;
  last_update: string;
  outcomes: OutComes[];
}

interface OutComes {
  name: string;
  price: number;
  point?: number;
}

interface OddBet {
  market: string;
  odd: string;
  money_bet: number;
  home_team?: string;
  away_team?: string;
  rate: number;
  eventid_oddsapi: string;
  league: string;
  date_of_match: string;
  teamChoose: string,
}

interface ResultBet {
  id: number;
  team_win: string;
  team_lose: string;
  win_score: number;
  lose_score: number;
  league: string;
  date_of_match: string; //time
  money_result: number;
  create_time: string; //time
  home_team: string;
  away_team: string;
  odd: string;
  rate: number;
  money_bet: number;
  eventid_oddsapi: string;
  userid: number;
  resultid: number;
  market: string;
  teamchoose:string;
}
