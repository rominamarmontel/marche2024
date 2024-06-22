import RegisterForm from '@/components/Register/RegisterForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/auth'

const Register = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/admin')
  }
  return <RegisterForm />
}

export default Register
