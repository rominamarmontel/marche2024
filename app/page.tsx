'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import JapaneseContent from '@/components/Home/HomeJapanese'
import FrenchContent from '@/components/Home/HomeFrench'
import EnglishContent from '@/components/Home/HomeEnglish'
import styles from './styles.module.css'

const Home = () => {
  const [isEnglish, setIsEnglish] = useState(false)
  const [isJapanese, setIsJapanese] = useState(false)
  const [isFrench, setIsFrench] = useState(true)
  const [showContainer, setShowContainer] = useState(false)

  useEffect(() => {
    setShowContainer(true)
  }, [isEnglish, isJapanese, isFrench])

  const toggleLanguage = () => {
    setIsEnglish(true)
    setIsJapanese(false)
    setIsFrench(false)
    setTimeout(() => setShowContainer(true), 0)
  }

  const toggleLanguageJapanese = () => {
    setIsEnglish(false)
    setIsJapanese(true)
    setIsFrench(false)
    setTimeout(() => setShowContainer(true), 0)
  }

  const toggleLanguageFrench = () => {
    setIsEnglish(false)
    setIsJapanese(false)
    setIsFrench(true)
    setTimeout(() => setShowContainer(true), 0)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left_container}>
          <div className={styles.imgContainer}>
            <Image
              src="/images/chef.jpg"
              alt="chef"
              fill
              className={styles.chef_image}
              priority={true}
            />
          </div>
          <div className={styles.language_container}>
            <ul className={styles.language}>
              <li
                onClick={toggleLanguageJapanese}
                className={`sawarabi-mincho-regular cursor-pointer ${
                  isJapanese ? 'text-black' : 'text-gray-400'
                } transition-colors duration-500 tracking-wide`}
              >
                日本語
              </li>
              <li
                onClick={toggleLanguageFrench}
                className={`sawarabi-mincho-regular cursor-pointer ${
                  isFrench ? 'text-black' : 'text-gray-400'
                } transition-colors duration-500 tracking-wide`}
              >
                FRANCAIS
              </li>
              <li
                onClick={toggleLanguage}
                className={`sawarabi-mincho-regular cursor-pointer ${
                  isEnglish ? 'text-black' : 'text-gray-400'
                } transition-colors duration-500 tracking-wide`}
              >
                ENGLISH
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${styles.right_container} ${
            showContainer ? styles.fadeIn : ''
          }`}
        >
          {isEnglish ? (
            <EnglishContent />
          ) : isJapanese ? (
            <JapaneseContent />
          ) : (
            <FrenchContent />
          )}
        </div>
      </div>
    </>
  )
}

export default Home
