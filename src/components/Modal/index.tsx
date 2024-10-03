'use client'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function Modal({ isOpen, setIsOpen }: Props) {
  const { toast } = useToast()
  const handleConfirm = () => {
    toast({
      title: 'Confirm bet',
      description: 'Your bet has been confirmed',
      duration: 2000,
    })
  }
  return (
    <div className='flex flex-col items-center'>
      {/* Button to open dialog */}

      {/* Dialog component */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Confirm bet</DialogTitle>
          <DialogDescription>
            <p className='text-lg text-black font-bold'> Manchester United</p>
            <p className='font-semibold'>
              Odd: Handicap <span className='text-green-500'>0.5</span>
            </p>
            <Input type='number' />
          </DialogDescription>
          <div className='flex justify-end gap-2'>
            <Button variant={'destructive'} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant={'default'}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal
