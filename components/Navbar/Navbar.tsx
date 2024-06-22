'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import styles from './styles.module.css'
import LinksGourmet from './links/LinksGourmet'
import LinksMarche from './links/LinksMarche'

const Navbar = () => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={styles.container}>
      {(pathname === '/sushimarche' ||
        pathname === '/en/sushimarche' ||
        pathname === '/jp/sushimarche') && <LinksMarche />}
      {(pathname === '/sushigourmet' ||
        pathname === '/jp/sushigourmet' ||
        pathname === '/en/sushigourmet') && <LinksGourmet />}
    </div>
  )
}

export default Navbar
