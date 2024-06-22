'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

type LanguageContextProps = {
  children: ReactNode
}

type LanguageContextType = {
  isEnglish: boolean
  isJapanese: boolean
  toggleLanguage: () => void
  toggleLanguageJapanese: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export const LanguageProvider: React.FC<LanguageContextProps> = ({
  children,
}) => {
  const pathname = usePathname()
  const [isEnglish, setIsEnglish] = useState(pathname.startsWith('/en'))
  const [isJapanese, setIsJapanese] = useState(pathname.startsWith('/jp'))
  const [isToggled, setIsToggled] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const currentPath = pathname
    const isEnglishPath = currentPath.startsWith('/en')
    const isJapanesePath = currentPath.startsWith('/jp')

    let newPath
    if (isEnglish) {
      if (!isEnglishPath) {
        newPath = currentPath.replace('/', '/en')
      } else {
        newPath = currentPath
      }
    } else if (isJapanese) {
      if (!isJapanesePath) {
        newPath = currentPath.replace('/', '/jp')
      } else {
        newPath = currentPath
      }
    }
    if (isToggled && newPath) {
      router.push(newPath)
      setIsToggled(false)
    }
  }, [isEnglish, isJapanese, isToggled, pathname, router])

  const toggleLanguage = () => {
    setIsActive(!isActive)
    setIsToggled(true)
    setIsEnglish((prevIsEnglish) => !prevIsEnglish)
  }

  const toggleLanguageJapanese = () => {
    setIsActive(!isActive)
    setIsToggled(true)
    setIsJapanese((prevIsJapanese) => !prevIsJapanese)
  }

  return (
    <LanguageContext.Provider
      value={{ isEnglish, isJapanese, toggleLanguage, toggleLanguageJapanese }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
