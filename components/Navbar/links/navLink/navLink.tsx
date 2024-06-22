'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './styles.module.css'

interface NavLinkProps {
  item: {
    title: string
    path: string
  }
  onClick?: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const pathName = usePathname()

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path ? styles.active : ''
      }`}
      onClick={onClick}
    >
      {item.title}
    </Link>
  )
}

export default NavLink
