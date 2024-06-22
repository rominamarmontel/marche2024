'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './styles.module.css'

interface LangItemProps {
  item: {
    title: string
    path: string
  }
}

const NavLinkLang: React.FC<LangItemProps> = ({ item }) => {
  const pathName = usePathname()

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path ? styles.active : ''
      }`}
    >
      {item.title}
    </Link>
  )
}

export default NavLinkLang
