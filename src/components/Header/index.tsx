import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { convertToVND } from '@/lib/utils'

type Props = {}

type UserInfo = {
  name: string
  money: number
}

export async function getData() {
  const userInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/3`).then(res => res.json())
  return userInfo.result
}
export default async function Header({}: Props) {
  const data: UserInfo = await getData()
  const { name, money } = data
  
  return (  
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
            <p className='text-gray-200'>{name}</p>
            <p className=''>{convertToVND(money)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
