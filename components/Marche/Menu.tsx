'use client'

import { useState, useEffect } from 'react'
import MenuEnglish from './MenuEnglish/MenuEnglish'
import MenuJapanese from './MenuJapanese/MenuJapanese'
import MenuFrench from './MenuFrench/MenuFrench'
import { usePathname } from 'next/navigation'
import styles from './styles.module.css'
import { TMarche } from '@/types'

const Menu = () => {
  const pathname = usePathname()
  const [isEnglish, setIsEnglish] = useState(false)
  const [isJapanese, setIsJapanese] = useState(false)
  const [isFrench, setIsFrench] = useState(true)
  const [marches, setMarches] = useState<TMarche[]>([])

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
    const fetchAllMarches = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/marches`
        )
        if (res.ok) {
          const data = await res.json()
          setMarches(data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAllMarches()
  }, [])
  console.log(marches)
  return (
    <div className={styles.Menu}>
      <div className={styles.Menu_container}>
        {/* <h1 className={styles.Menu_title}>MENU</h1> */}
        {/* <p>Current Pathname: {pathname}</p> */}
        {isEnglish ? (
          <MenuEnglish marches={marches} />
        ) : isJapanese ? (
          <MenuJapanese marches={marches} />
        ) : (
          <MenuFrench marches={marches} />
        )}
      </div>
    </div>
  )
}

export default Menu
