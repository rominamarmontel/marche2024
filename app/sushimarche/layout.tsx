import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './styles.module.css'
import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default layout
