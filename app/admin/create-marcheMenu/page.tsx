import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/auth'
import { redirect } from 'next/navigation'
import CreateMarchePage from '@/components/Admin/CreateMarchePage'
import styles from '../styles.module.css'

const CreateMarche = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  return <CreateMarchePage />
}
export default CreateMarche
