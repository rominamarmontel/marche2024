import DashboardTop from '@/components/Admin/Dashboard'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/auth'
import { redirect } from 'next/navigation'
import styles from './styles.module.css'

const AdminPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  return <DashboardTop />
}

export default AdminPage
