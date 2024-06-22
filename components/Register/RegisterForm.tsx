'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import styles from './styles.module.css'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      toast.error('All fields are necessary')
      return
    }

    try {
      const resUserExists = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      const { user } = await resUserExists.json()
      if (user) {
        toast.error('User already exists')
        return
      }

      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) {
        const form = e.target as HTMLFormElement
        form.reset()
        router.push('/login')
      } else {
        console.log('User registration failed')
      }
    } catch (error) {
      console.log('Error during registration', error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.title}>
            <h2>Register</h2>
          </div>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="User name"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="current-password"
                placeholder="password"
              />
            </div>
            <div className={styles.btnContainer}>
              <button className="primary-btn">Register</button>
            </div>
            <Link href={'/login'} className={styles.text}>
              Do you have an account? {''}
              <span className={styles.text}>Login</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
