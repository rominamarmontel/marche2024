'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import styles from '../Admin/styles.module.css'
import { RiDeleteBin6Line } from 'react-icons/ri'

export const DeleteButton = ({
  id,
  publicId,
}: {
  id: string
  publicId?: string
}) => {
  const router = useRouter()

  const deleteImage = async (publicIds: string[]) => {
    try {
      const res = await fetch('api/removeImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicIds }),
      })
      if (res.ok) {
        console.log('Image deleted from Cloudinary')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure to delete this image??')

    if (confirmed) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/gourmets/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        if (res.ok) {
          const deletedGourmet = await res.json()
          const publicIds =
            deletedGourmet.imageData?.map(
              (image: { publicId: string }) => image.publicId
            ) || []
          await deleteImage(publicIds)
          toast.success('Gourmet deleted successfully')
          window.location.reload()
        }
      } catch (error) {
        toast.error('Something went wrong')
        console.log(error)
      }
    }
  }

  return (
    <button onClick={handleDelete}>
      <RiDeleteBin6Line className={styles.deleteButton} />
    </button>
  )
}
