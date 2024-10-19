import React from 'react'
import { IoIosFootball } from 'react-icons/io'

type Props = {}

export default function Sidebar({}: Props) {
  return (
    <div className='w-1/6 bg-slate-800 rounded-md min-h-full'>
      {/* <div className='w-1/4 bg-slate-800 rounded-md fixed top-0 left-0 h-screen'> */}
      <ul className='flex flex-col gap-2 p-4'>
        <li className='flex items-center '>
          <IoIosFootball className='mr-2' />
          <p>Football</p>
        </li>
      </ul>
    </div>
  )
}
