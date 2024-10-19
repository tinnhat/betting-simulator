'use client'
import {
  BookmakerInfo,
  MarketsInfo,
  MatchInfo,
  OddBet,
  OddInfo,
  OutComes,
} from '@/app/types'
import { useToast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import Modal from '../Modal'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

type Props = {}
const teamChoose: string = 'Manchester City'
export default function Bet({}: Props) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [matchs, setMatchs] = useState<MatchInfo[]>([])
  const [position, setPosition] = useState(0)
  const [matchShow, setMatchShow] = useState<MatchInfo>({} as MatchInfo)
  const [oddChoose, setOddChoose] = useState<OddBet>({} as OddBet)
  const [oddBets, setOddBets] = useState<OddInfo>({} as OddInfo)
  const [loading, setLoading] = useState(false)
  const getMatchComing = async () => {
    try {
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/soccer_epl/events?apiKey=${process.env.NEXT_PUBLIC_THE_ODDS_API_KEY}`
      )
      const result = await response.json()
      const listMatch = result.filter(
        (item: MatchInfo) =>
          item.home_team.toLowerCase() === teamChoose.toLowerCase() ||
          item.away_team.toLowerCase() === teamChoose.toLowerCase()
      )
      const matchChoose = listMatch[0]
      matchChoose.img_home = await getImageBadgeTeam(matchChoose.home_team)
      matchChoose.img_away = await getImageBadgeTeam(matchChoose.away_team)

      getImageBadgeTeam(matchChoose.away_team)
      setMatchs(listMatch)
      setPosition(0)
      //call api get image

      setMatchShow(matchChoose)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Get match',
        description: 'Error when fetching match',
        duration: 2000,
      })
    }
  }

  const getOdds = async (eventid: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/soccer_epl/events/${eventid}/odds?apiKey=${process.env.NEXT_PUBLIC_THE_ODDS_API_KEY}&regions=uk&markets=h2h`
      )
      const result = await response.json()
      setOddBets(result)
    } catch (error) {
      toast({
        title: 'Odds',
        description: 'Error when fetching odds',
        duration: 2000,
      })
    } finally {
      setLoading(false)
    }
  }

  const getImageBadgeTeam = async (team: string) => {
    let image: string = ''
    try {
      const response = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${team}`
      )
      const result = await response.json()
      if (result.teams === null) return ''
      image = result.teams[0].strBadge
    } catch (error) {
      console.log(error)
    }
    return image
  }

  useEffect(() => {
    getMatchComing()
  }, [])

  useEffect(() => {
    if (matchShow.id) {
      getOdds(matchShow.id)
    }
  }, [matchShow])

  useEffect(() => {
    if (matchs.length > 0) {
      ;(async () => {
        const matchFind = matchs[position]
        matchFind.img_home = await getImageBadgeTeam(matchFind.home_team)
        matchFind.img_away = await getImageBadgeTeam(matchFind.away_team)
        setMatchShow(matchs[position])
      })()
    }
  }, [position])

  const handleNextMatch = () => {
    setPosition((prev) => prev + 1)
  }

  const handlePrevMatch = () => {
    setPosition((prev) => prev - 1)
  }

  const handleChooseBet = (
    home_team: string,
    away_team: string,
    odd: string,
    rate: number,
    teamChoose: string,
    eventid_oddsapi: string,
    market: string,
    league: string,
    time: string
  ) => {
    let homeTeam = ''
    let awayTeam = ''
    homeTeam = home_team ?? teamChoose
    awayTeam = away_team ?? teamChoose

    setOddChoose({
      market,
      odd,
      money_bet: 0,
      home_team: homeTeam,
      away_team: awayTeam,
      rate,
      eventid_oddsapi,
      league,
      date_of_match: time,
      teamChoose,
    })
    setIsOpen(true)
  }

  return (
    <>
      <div className="w-4/6 bg-slate-800 rounded-md min-h-full">
        <div className="p-4 flex flex-col items-center justify-between">
          <div className="flex gap-10 items-center justify-between w-full">
            {matchs.length > 0 && (
              <Button disabled={position === 0} onClick={handlePrevMatch}>
                Prev
              </Button>
            )}
            <h1 className="text-green-600 font-bold text-center">Match day</h1>
            {matchs.length > 0 && (
              <Button
                disabled={position === matchs.length - 1}
                onClick={handleNextMatch}
              >
                Next
              </Button>
            )}
          </div>

          <div className="flex gap-10 items-center justify-between mt-4 w-full">
            {/* team 1 */}
            <div className="w-2/5 text-center flex flex-col justify-center items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={matchShow?.img_home}
                  alt={matchShow?.home_team}
                />
                <AvatarFallback>{matchShow?.home_team}</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-blue-400 font-bold">
                {matchShow?.home_team} (H)
              </p>
            </div>
            <div className="w-1/5 text-center">
              <p>
                {new Date(matchShow?.commence_time).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <div className="w-2/5 text-center flex flex-col justify-center items-center">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={matchShow?.img_away}
                  alt={matchShow?.away_team}
                />
                <AvatarFallback>{matchShow?.away_team}</AvatarFallback>
              </Avatar>
              <p className="mt-2 text-blue-400 font-bold">
                {matchShow?.away_team}
              </p>
            </div>
          </div>
          {/* odds */}
          <p className="text-green-600 font-bold mt-6">Odds</p>
          <div className="mt-6 w-full max-h-64 overflow-auto">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            {loading ? (
              <div className="flex items-center space-x-4">Loading...</div>
            ) : (
              <ul className="flex flex-col gap-2">
                {oddBets?.bookmakers?.map((item: BookmakerInfo) => (
                  <>
                    <li className="w-full" key={item.key}>
                      <h6 className="text-blue-600 font-bold text-sm">
                        {item.title}
                      </h6>
                      {item.markets.map((market: MarketsInfo, idx: number) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center w-full mt-2"
                        >
                          <div className="w-1/6 text-sm">
                            Odd:{' '}
                            <span className="font-bold">
                              {market.key.toUpperCase()}
                            </span>
                          </div>
                          <div className="w-5/6 flex justify-between items-center text-sm text-gray-200">
                            {market.outcomes.map(
                              (outcome: OutComes, index: number) =>
                                outcome.name === 'Draw' ? null : (
                                  <div
                                    key={index}
                                    className="w-1/3 text-center"
                                  >
                                    <p className="whitespace-pre-wrap">
                                      {outcome.name}{' '}
                                      {outcome.point && (
                                        <span className="text-red-500">
                                          ({outcome.point})
                                        </span>
                                      )}
                                      <span
                                        onClick={() =>
                                          handleChooseBet(
                                            oddBets?.home_team,
                                            oddBets?.away_team,
                                            market.key,
                                            outcome.price,
                                            `${outcome.name}${
                                              outcome.point ?? ''
                                            }`,
                                            oddBets?.id,
                                            item.key,
                                            oddBets?.sport_title,
                                            oddBets?.commence_time
                                          )
                                        }
                                        className="text-green-400 cursor-pointer hover:text-green-200 transition-colors duration-300 ml-4"
                                      >
                                        {outcome.price}
                                      </span>
                                    </p>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      ))}
                    </li>
                    <hr className="my-4 border-gray-400" />
                  </>
                ))}
              </ul>
            )}
          </div>
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} oddChoose={oddChoose} />
        )}
      </div>
    </>
  )
}
