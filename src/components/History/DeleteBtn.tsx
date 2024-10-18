'use client'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { MdDelete } from 'react-icons/md'
type Props = {
  id: number
}

export default function DeleteBtn({ id }: Props) {
  const router = useRouter()
  const handleDelete = async (id: number) => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bet/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', // Ensure JSON body format is specified
          },
          body: JSON.stringify({ userid: 2 }), // Send 'userid' as JSON
        }
      )

      if (result.ok) {
        router.refresh()
        toast({
          title: 'Delete Bet successfully',
          description: 'Your bet has been remove',
          className: 'bg-green-500 text-white',
        })
      } else {
        const errorData = await result.json()
        console.log(errorData.message)
        toast({
          title: 'Delete Bet unsuccessfully',
          description: 'Your bet cannot remove',
          className: 'bg-red-500 text-white',
        })
        throw new Error(errorData.message || 'Failed to place bet')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'An error occurred',
        className: 'bg-red-500 text-white',
      })
    }
  }
  return (
    <MdDelete
      onClick={() => handleDelete(id)}
      className="bg-red-500 w-4 h-4 rounded-sm cursor-pointer"
    />
  )
}
