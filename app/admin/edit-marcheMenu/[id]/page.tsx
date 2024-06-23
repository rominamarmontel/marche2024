import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../api/auth/auth'
import { redirect } from 'next/navigation'
import { TMarche } from '@/types'
import EditMarchePage from '@/components/Admin/EditMarchePage'

const getMarcheById = async (id: string): Promise<TMarche | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/marches/${id}`,
      {
        cache: 'no-store',
      }
    )
    if (res.ok) {
      const data = await res.json()
      console.log('Fetch successful:', data)
      const marche = data.marche
      return marche
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditMarche({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const marche = await getMarcheById(params.id)
  console.log(marche)
  return (
    <>
      {marche ? <EditMarchePage marche={marche} /> : <div>Invalid Marche</div>}
    </>
  )
}
