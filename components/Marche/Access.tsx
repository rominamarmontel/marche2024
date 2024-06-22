'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AccessEnglish from './AccessEnglish'
import AccessJapanese from './AccessJapanese'
import AccessFrench from './AccessFrench'
import styles from './styles.module.css'

const Access = () => {
  const pathname = usePathname()
  const [isEnglish, setIsEnglish] = useState(false)
  const [isJapanese, setIsJapanese] = useState(false)
  const [isFrench, setIsFrench] = useState(true)

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

  return (
    <div className={styles.Access} id="Access">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.271063264972!2d2.275534867386273!3d48.85304130119142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67aaa18ef3c43%3A0x4866c96d49296c0d!2s1%20Rue%20de%20l&#39;Assomption%2C%2075016%20Paris!5e0!3m2!1sen!2sfr!4v1717616164475!5m2!1sen!2sfr"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
      <div className={styles.Access_container}>
        <h1 className={styles.Access_title}>ACCESS</h1>
        <div>
          {isEnglish ? (
            <AccessEnglish />
          ) : isJapanese ? (
            <AccessJapanese />
          ) : (
            <AccessFrench />
          )}
        </div>
      </div>
    </div>
  )
}

export default Access
