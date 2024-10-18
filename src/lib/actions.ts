'use server'

export const handleDelete = (id:number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/result/${id}`, {
      method: 'DELETE',
    })
  }