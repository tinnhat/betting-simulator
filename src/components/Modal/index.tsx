'use client'
import { OddBet } from '@/app/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  oddChoose: OddBet
}
function Modal({ isOpen, setIsOpen, oddChoose }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [moneyBet, setMoneyBet] = useState(0)
  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      if (moneyBet <= 0 || moneyBet < 20000) {
        toast({
          title: 'Error',
          description: 'Min bet is 20.000 VND',
        })
        return
      }
      const dataSubmit = {
        ...oddChoose,
        money_bet: moneyBet,
        userid: 1,
      }
      const result = await fetch('api/bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSubmit),
      })
      if (result.ok) {
        // window.location.reload();
        router.refresh() // refresh to get new data (but only for server component) and it NOT reload page to call api
        /*
          router.refresh(): Refresh the current route. Making a new request to the server, re-fetching data requests, 
          and re-rendering Server Components. The client will merge the updated React Server Component payload 
          without losing unaffected client-side React (e.g. useState) or browser state 
        */
        setIsOpen(false)
        toast({
          title: 'Bet successfully',
          description: 'Your bet has been placed', // Ensure this is a string
          duration: 2000,
        })
      } else {
        const errorData = await result.json()
        console.log(errorData.message)
        throw new Error(errorData.message || 'Failed to place bet')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'An error occurred',
        duration: 2000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Button to open dialog */}

      {/* Dialog component */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>
            Confirm bet -{' '}
            <span className="text-blue-300">{oddChoose.market}</span>{' '}
          </DialogTitle>
          <DialogDescription>
            <p className="text-lg text-black font-bold">
              {oddChoose.home_team || oddChoose.away_team || ''}
            </p>
            <p className="font-semibold">
              Odd: {oddChoose.odd}{' '}
              <span className="text-green-500">{oddChoose.rate}</span>
            </p>
            <Input
              value={moneyBet}
              onChange={(e) => setMoneyBet(Number(e.target.value))}
              min={0}
              max={9999999999}
              step={1000}
              type="number"
              disabled={isLoading}
            />
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button
              variant={'destructive'}
              disabled={isLoading}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleConfirm}
              variant={'default'}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal
