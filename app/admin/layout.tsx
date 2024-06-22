'use client'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { ReactNode, Fragment } from 'react'
import { Toaster } from 'react-hot-toast'
import styles from './styles.module.css'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Sidebar />
      <div className={styles.container}>{children}</div>
      <Toaster />
    </Fragment>
  )
}

export default DashboardLayout
