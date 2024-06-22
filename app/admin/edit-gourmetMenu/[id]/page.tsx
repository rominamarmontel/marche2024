import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/auth'
import { redirect } from 'next/navigation'
import { TGourmet } from '@/types'
import EditGourmetPage from '@/components/Admin/EditGourmetPage'

const getGourmetById = async (id: string): Promise<TGourmet | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/gourmets/${id}`,
      {
        cache: 'no-store',
      }
    )
    if (res.ok) {
      const data = await res.json()
      console.log('Fetch successful:', data)
      const gourmet = data.gourmet
      return gourmet
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditGourmet({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const gourmet = await getGourmetById(params.id)
  console.log(gourmet)
  return (
    <>
      {gourmet ? (
        <EditGourmetPage gourmet={gourmet} />
      ) : (
        <div>Invalid Gourmet</div>
      )}
    </>
  )
}
