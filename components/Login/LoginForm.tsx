'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import styles from './styles.module.css'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Email and Password are required')
    }
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (res?.error) {
        toast.error('Invalid credentials')
        return
      }
      router.replace('admin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.title}>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email or account"
            />
          </div>
          <div className={styles.formGroup}>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </div>
          <div className={styles.btnContainer}>
            <button className="primary-btn">Login</button>
          </div>
          <Link href={'/register'} className={styles.text}>
            Do you have an account? {''}
            <span className={styles.text}>Register</span>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
