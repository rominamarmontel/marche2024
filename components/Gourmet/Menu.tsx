'use client'

import { useState, useEffect } from 'react'
import MenuEnglish from './MenuEnglish/MenuEnglish'
import MenuJapanese from './MenuJapanese/MenuJapanese'
import MenuFrench from './MenuFrench/MenuFrench'
import { usePathname } from 'next/navigation'
import { TGourmet } from '@/types'
import styles from './styles.module.css'

const Menu = () => {
  const pathname = usePathname()
  const [isEnglish, setIsEnglish] = useState(false)
  const [isJapanese, setIsJapanese] = useState(false)
  const [isFrench, setIsFrench] = useState(true)
  const [gourmets, setGourmets] = useState<TGourmet[]>([])

  useEffect(() => {
    if (pathname.startsWith('/en')) {
      setIsEnglish(true)
      setIsJapanese(false)
      setIsFrench(false)
    } else if (pathname.startsWith('/jp')) {
      setIsEnglish(false)
      setIsJapanese(true)
      setIsFrench(false)
    } else {
      setIsEnglish(false)
      setIsJapanese(false)
      setIsFrench(true)
    }
  }, [pathname])

  useEffect(() => {
    const fetchAllGourmets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/gourmets`
        )
        if (res.ok) {
          const data = await res.json()
          setGourmets(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllGourmets()
  }, [])

  return (
    <div className={styles.Menu}>
      <div className={styles.Menu_container}>
        {/* <p>Current Pathname: {pathname}</p> */}
        {isEnglish ? (
          <MenuEnglish gourmets={gourmets} />
        ) : isJapanese ? (
          <MenuJapanese gourmets={gourmets} />
        ) : (
          <MenuFrench gourmets={gourmets} />
        )}
      </div>
    </div>
  )
}

export default Menu
