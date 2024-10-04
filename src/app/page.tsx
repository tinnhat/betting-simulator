import Bet from '@/components/Bet'
import Header from '@/components/Header'
import History from '@/components/History'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div className='bg-black text-white h-screen w-screen p-4'>
      <div className='w-11/12 mx-auto'>
        {/* header */}
        <Header />
        {/* main body */}
        <div className='flex mt-4 h-[calc(100vh-10rem)] gap-4'>
          {/* sidebar */}
          <Sidebar />
          {/* main */}
          <Bet />
          {/* history */}
          <History />
        </div>
      </div>
    </div>
  )
}
