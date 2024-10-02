'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function Modal({ isOpen, setIsOpen }: Props) {
  return (
    <div className='flex flex-col items-center'>
      {/* Button to open dialog */}

      {/* Dialog component */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {/* Optionally, this can be another button or trigger component */}
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>This is a Dialog</DialogTitle>
          <DialogDescription>
            Here is some description for the dialog. You can close it by clicking the close button
            or pressing escape.
          </DialogDescription>
          <button
            className='mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors duration-300'
            onClick={() => setIsOpen(false)}
          >
            Close Dialog
          </button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Modal
