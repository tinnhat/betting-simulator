'use client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoIosFootball } from 'react-icons/io'
import Modal from '@/components/Modal'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='bg-black text-white h-screen w-screen p-4'>
      {/* header */}
      <div className='w-11/12 mx-auto'>
        <div className='flex items-center justify-between p-4 shadow-lg rounded-lg bg-slate-800  text-sm'>
          <div>
            <p className='text-green-600'>SM-FB</p>
          </div>
          <div className='flex items-center gap-5'>
            <Button variant={'secondary'} size={'sm'}>
              Deposit
            </Button>
            <div className='flex gap-2 items-center'>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col text-white'>
                <p className='text-gray-200'>Super Admin</p>
                <p className=''>200.000.000 Đ</p>
              </div>
            </div>
          </div>
        </div>
        {/* main body */}
        <div className='flex mt-4 h-[calc(100vh-10rem)] gap-4'>
          {/* sidebar */}
          <div className='w-1/5 bg-slate-800 rounded-md min-h-full'>
            {/* <div className='w-1/4 bg-slate-800 rounded-md fixed top-0 left-0 h-screen'> */}
            <ul className='flex flex-col gap-2 p-4'>
              <li className='flex items-center '>
                <IoIosFootball className='mr-2' />
                <p>Football</p>
              </li>
              <li className='flex items-center '>
                <IoIosFootball className='mr-2' />
                <p>Football</p>
              </li>
              <li className='flex items-center '>
                <IoIosFootball className='mr-2' />
                <p>Football</p>
              </li>
              <li className='flex items-center '>
                <IoIosFootball className='mr-2' />
                <p>Football</p>
              </li>
              <li className='flex items-center '>
                <IoIosFootball className='mr-2' />
                <p>Football</p>
              </li>
              <li className='flex items-center '>
                <IoIosFootball className='mr-2' />
                <p>Football</p>
              </li>
              <li className='flex items-center '>
                <IoIosFootball className='mr-2' />
                <p>Football</p>
              </li>
            </ul>
          </div>
          {/* main */}
          <div className='w-3/5 bg-slate-800 rounded-md min-h-full'>
            <div className='p-4 flex flex-col items-center justify-between'>
              <h1 className='text-green-600 font-bold text-center'>Match day</h1>
              <div className='flex gap-10 items-center justify-between mt-4'>
                {/* team 1 */}
                <div className='flex flex-col items-center'>
                  <Avatar className='w-20 h-20'>
                    <AvatarImage
                      src='https://upload.wikimedia.org/wikipedia/vi/a/a1/Man_Utd_FC_.svg'
                      alt='@shadcn'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className='mt-2'>Manchester United</p>
                </div>
                <div className='text-sm flex flex-col items-center'>
                  <p>12:30 20/10/2024</p>
                  <p>Stadium: Stadium 1</p>
                </div>
                {/* team 2 */}
                <div className='flex flex-col items-center'>
                  <Avatar className='w-20 h-20'>
                    <AvatarImage
                      src='https://upload.wikimedia.org/wikipedia/vi/1/1d/Manchester_City_FC_logo.svg'
                      alt='@shadcn'
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className='mt-2'>Manchester United</p>
                </div>
              </div>
              {/* odds */}
              <div className='mt-6 w-full'>
                <div className='relative flex items-center'>
                  <div className='border-t border-gray-500 w-1/3 mx-auto'>
                    <ul className='flex flex-col gap-2 mt-4'>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p
                          onClick={() => setIsOpen(true)}
                          className='text-green-400 cursor-pointer hover:text-green-200 transition-colors duration-300'
                        >
                          2.4
                        </p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                    </ul>
                  </div>

                  <p className='text-white px-4'>Odds</p>
                  <div className='border-t border-gray-500 w-1/3 mx-auto'>
                    <ul className='flex flex-col gap-2 mt-4'>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                      <li className='flex justify-between items-center text-sm'>
                        <p>Handicap</p>
                        <p className='text-green-400'>2.4</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* history */}
          <div className='w-1/5 bg-slate-800 rounded-md min-h-full overflow-y-auto'>
            <div className='p-4'>
              <h1 className='text-green-600 font-bold'>History</h1>
              <ul className='mt-2 flex flex-col gap-4'>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-green-400'> + 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-green-400'> + 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-green-400'> + 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-red-400'> - 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-red-400'> - 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-red-400'> - 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-red-400'> - 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-red-400'> - 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-red-400'> - 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
                <li className='flex flex-col border-t-2 border-solid border-gray-200 pt-2'>
                  <div className='flex gap-4 items-center'>
                    <p>
                      Germany <span className='text-blue-400'>(H)</span>
                    </p>
                    <p className='text-sm text-yellow-400'>vs</p>
                    <p>Scotland</p>
                  </div>
                  <div className='text-sm flex justify-between'>
                    <p>Odd: Over 2.5</p>
                    <p className='text-teal-400'>25.000.000 Đ</p>
                  </div>
                  <div>
                    <p className='font-semibold text-sm'>
                      Result: <span className='text-red-400'> - 2.000.000 Đ</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Toaster />
    </div>
  )
}
