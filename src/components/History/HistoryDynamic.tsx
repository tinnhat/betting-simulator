/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ResultBet } from '@/app/types'
import { convertToVND } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
type Props = {
  item: ResultBet
}

const checkMath = (infoHomeTeam: any, infoAwayTeam: any) => {
  if (infoHomeTeam.score > infoAwayTeam.score) {
    return infoHomeTeam
  } else if (infoHomeTeam.score < infoAwayTeam.score) {
    return infoAwayTeam
  } else return 'Draw'
}

export default function HistoryDynamic({ item }: Props) {
  const router = useRouter()
  const updateMoneyResult = async (data: any) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/result/update/${item.resultid}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
          body: JSON.stringify(data),
        }
      )
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  const fetchResult = async () => {
    if (item.money_result !== null) return
    const res = await fetch(
      'https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=133613'
    )
    const data = await res.json()
    const dateTimeString = item.date_of_match
    const dateObj = new Date(dateTimeString)
    const datePart = dateObj.toISOString().substring(0, 10)
    const dateObjNow = new Date()
    const datePartNow = dateObjNow.toISOString().substring(0, 10)
    const filter = data.results.filter(
      (val: any) => val.dateEvent === datePart && val.dateEvent < datePartNow
    )
    //1 match 1 day
    if (filter.length > 0) {
      const matchDay = filter[0]
      const infoHomeTeam = {
        name: matchDay.strAwayTeam,
        score: +matchDay.intAwayScore,
      }
      const infoAwayTeam = {
        name: matchDay.strHomeTeam,
        score: +matchDay.intHomeScore,
      }
      const checkTeamWin = checkMath(infoHomeTeam, infoAwayTeam)
      if (checkTeamWin === 'Draw') {
        //match draw
        return
      }
      let dataSendApi: any = {}
      if (item.teamchoose === checkTeamWin.name) {
        //win + tien
        const rate = item.rate
        const moneyEarn = item.money_bet * rate

        dataSendApi = {
          team_win: checkTeamWin.name,
          win_score: checkTeamWin.score,
          team_lose:
            checkTeamWin.name === infoAwayTeam.name
              ? infoHomeTeam.name
              : infoAwayTeam.name,
          lose_score:
            checkTeamWin.score === infoAwayTeam.score
              ? infoHomeTeam.score
              : infoAwayTeam.score,
          userid: 2,
          betid: item.id,
          money_bet: item.money_bet,
          money_result: moneyEarn,
        }
      } else {
        //loose - tien
        dataSendApi = {
          team_win: checkTeamWin.name,
          win_score: checkTeamWin.score,
          team_lose:
            checkTeamWin.name === infoAwayTeam.name
              ? infoHomeTeam.name
              : infoAwayTeam.name,
          lose_score:
            checkTeamWin.score === infoAwayTeam.score
              ? infoHomeTeam.score
              : infoAwayTeam.score,
          userid: 2,
          betid: item.id,
          money_bet: item.money_bet,
          money_result: 0,
        }
      }
      //call api update
      updateMoneyResult(dataSendApi)
    }
  }

  useEffect(() => {
    // Poll every 10 seconds (10000 milliseconds)
    const interval = setInterval(() => {
      const dateObj = new Date(item.date_of_match)
      const datePart = dateObj.toISOString().substring(0, 10)
      const dateObjNow = new Date()
      const datePartNow = dateObjNow.toISOString().substring(0, 10)
      if (datePart > datePartNow) {
        //next day will have result
        fetchResult()
      }
    }, 10000)
    return () => clearInterval(interval) // Clean up on component unmount
  }, [])
  return (
    <span className="text-green-400"> {convertToVND(item.money_result)}</span>
  )
}
