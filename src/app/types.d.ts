import { StringDecoder } from "string_decoder"

interface MatchInfo {
  id: string
  away_team: string
  commence_time: string
  home_team: string
  sport_key: string
  sport_title: string
  img_home?: string
  img_away?: string
}

interface OddInfo {
  id: string
  sport_key: string
  sport_title: string
  commence_time: string
  home_team: string
  away_team: string
  bookmakers: BookmakerInfo[]
}

interface BookmakerInfo {
  key: string
  title: string
  markets: MarketsInfo[]
}

interface MarketsInfo {
  key: string
  last_update: string
  outcomes: OutComes[]
}

interface OutComes {
  name: string
  price: number
  point?: number
}

interface OddBet {
  market:string
  odd: string
  money_bet: number
  home_team?: string
  away_team?: string
  rate: number
  eventid_oddsapi:string
  league:string
  date_of_match:string
}