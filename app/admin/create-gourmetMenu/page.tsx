import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'
import CreateGourmetPage from '@/components/Admin/CreateGourmetPage'
import styles from '../styles.module.css'

const CreateGourmet = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  return <CreateGourmetPage />
}
export default CreateGourmet
