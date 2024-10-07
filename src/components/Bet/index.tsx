'use client'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Modal from '../Modal'
import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
interface MatchInfo {
  id: string
  away_team: string
  commence_time: string
  home_team: string
  sport_key: string
  sport_title: string
}
type Props = {}
const teamChoose = 'Manchester City'
export default function Bet({}: Props) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [matchs, setMatchs] = useState<MatchInfo[]>([])
  const [position, setPosition] = useState(0)
  const [matchShow, setMatchShow] = useState<MatchInfo>({} as MatchInfo)
  const getMatchComing = async () => {
    try {
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/soccer_epl/events?apiKey=${process.env.NEXT_PUBLIC_THE_ODDS_API_KEY}`,
      )
      const result = await response.json()
      const listMatch = result.filter(
        (item: MatchInfo) =>
          item.home_team.toLowerCase() === teamChoose.toLowerCase() ||
          item.away_team.toLowerCase() === teamChoose.toLowerCase()
      )
      setMatchs(listMatch)
      setPosition(0)
      setMatchShow(listMatch[0])
    } catch (error) {
      console.log(error)
      toast({
        title: 'Get match',
        description: 'Error when fetching match',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    getMatchComing()
  }, [])

  useEffect(() => {
    if (matchs.length > 0) {
      setMatchShow(matchs[position])
    }
  }, [position])

  const handleNextMatch = () => {
    setPosition(prev => prev + 1)
  }

  const handlePrevMatch = () => {
    setPosition(prev => prev - 1)
  }

  return (
    <>
      <div className='w-3/5 bg-slate-800 rounded-md min-h-full'>
        <div className='p-4 flex flex-col items-center justify-between'>
          <div className='flex gap-10 items-center justify-between w-full'>
            {matchs.length > 0 && (
              <Button disabled={position === 0} onClick={handlePrevMatch}>
                Prev
              </Button>
            )}
            <h1 className='text-green-600 font-bold text-center'>Match day</h1>
            {matchs.length > 0 && (
              <Button disabled={position === matchs.length - 1} onClick={handleNextMatch}>
                Next
              </Button>
            )}
          </div>

          <div className='flex gap-10 items-center justify-between mt-4 w-full'>
            {/* team 1 */}
            <div className='w-2/5 text-center flex flex-col justify-center items-center'>
              <Avatar className='w-20 h-20'>
                <AvatarImage
                  src='https://www.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png'
                  alt='@shadcn'
                />
                <AvatarFallback>{matchShow?.home_team}</AvatarFallback>
              </Avatar>
              <p className='mt-2 text-blue-400 font-bold'>{matchShow?.home_team} (H)</p>
            </div>
            <div className='w-1/5 text-center'>
              <p>{new Date(matchShow?.commence_time).toLocaleDateString('vi-VN')}</p>
            </div>
            <div className='w-2/5 text-center flex flex-col justify-center items-center'>
              <Avatar className='w-20 h-20'>
                <AvatarImage
                  src='https://www.thesportsdb.com/images/media/team/badge/vwpvry1467462651.png'
                  alt='@shadcn'
                />
                <AvatarFallback>{matchShow?.home_team}</AvatarFallback>
              </Avatar>
              <p className='mt-2 text-blue-400 font-bold'>{matchShow?.away_team}</p>
            </div>
          </div>
          {/* odds */}
          <p className='text-green-600 font-bold mt-6'>Odds</p>
          <div className='mt-6 w-full'>
            {/* team 1 */}
            <p className='font-bold'>{matchShow?.home_team}</p>
            <div className='flex items-center text-sm'>
              <p>Handicap</p>
              <p
                onClick={() => setIsOpen(true)}
                className='text-green-400 cursor-pointer hover:text-green-200 transition-colors duration-300 ml-4'
              >
                2.4
              </p>
            </div>
            <hr className='my-4 border-gray-400' />
            {/* team 2 */}
            <p className='font-bold'>{matchShow?.away_team}</p>
            <div className='flex items-center text-sm'>
              <p>Handicap</p>
              <p
                onClick={() => setIsOpen(true)}
                className='text-green-400 cursor-pointer hover:text-green-200 transition-colors duration-300 ml-4'
              >
                2.4
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
