'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Modal from '../Modal'

type Props = {}

export default function Bet({}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='w-3/5 bg-slate-800 rounded-md min-h-full'>
        <div className='p-4 flex flex-col items-center justify-between'>
          <h1 className='text-green-600 font-bold text-center'>Match day</h1>
          <div className='flex gap-10 items-center justify-between mt-4'>
            {/* team 1 */}
            <div className='flex flex-col items-center'>
              <p className='mt-2 text-blue-400 font-bold'>Manchester United</p>
            </div>
            <div className='text-sm flex flex-col items-center'>
              <p>12:30 20/10/2024</p>
              <p>Stadium: Stadium 1</p>
            </div>
            {/* team 2 */}
            <div className='flex flex-col items-center'>
              <p className='mt-2 text-blue-400 font-bold'>Manchester United</p>
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
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
