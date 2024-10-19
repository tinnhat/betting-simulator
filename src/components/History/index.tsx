import { ResultBet } from '@/app/types'
import { convertToVND } from '@/lib/utils'
import DeleteBtn from './DeleteBtn'
import HistoryDynamic from './HistoryDynamic'
type Props = {}

export const dynamic = 'force-dynamic'
export default async function History({}: Props) {
  const listHistory = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/result/2`,
    {
      cache: 'no-store', // the latest data is fetched on each request
    }
  ).then((res) => res.json())

  return (
    <div className="w-1/5 bg-slate-800 rounded-md min-h-full overflow-y-auto">
      <div className="p-4 text-gray-300">
        <h1 className="text-green-600 font-bold">History</h1>
        <ul className="mt-2 flex flex-col gap-4">
          {listHistory.result.map((item: ResultBet) => (
            <li
              key={item.id}
              className="flex flex-col border-t-2 border-solid border-gray-200 pt-2"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm">
                  Match day:{' '}
                  {new Date(item.date_of_match).toLocaleDateString('vi-VN')}
                </p>
                {new Date(item.date_of_match) > new Date() && (
                  <DeleteBtn id={item.id} />
                )}
              </div>

              <div className="flex gap-4 items-center text-sm">
                <p>
                  {item.home_team} <span className="text-blue-400">(H)</span>
                </p>
                <p className="text-sm text-yellow-400">vs</p>
                <p>{item.away_team}</p>
              </div>

              <p className="text-sm">
                Team choose:{' '}
                <span className="font-semibold">{item.teamchoose}</span>
              </p>
              <div className="text-sm flex justify-between">
                <p>
                  Odd: {item.odd} {item.rate}
                </p>

                <p className="text-teal-400">{convertToVND(item.money_bet)}</p>
              </div>
              <div>
                <p className="text-sm">
                  Result: <HistoryDynamic item={item} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
