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
}

interface OddBet {
  market:string
  title: string
  price: number
  team: string
}