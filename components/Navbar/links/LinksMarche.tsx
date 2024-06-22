import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './styles.module.css'
import NavLink from './navLink/navLink'
import NavLinkLang from './navLink/navLinkLang'

interface LinkItem {
  title: string
  path: string
}

interface LangItem {
  title: string
  path: string
}

const links: { en: LinkItem[]; fr: LinkItem[]; jp: LinkItem[] } = {
  en: [
    { title: 'SET MENU', path: '#Menu' },
    { title: 'STARTERS', path: '#Starters' },
    { title: 'SUSHI&SASHIMI', path: '#SushiSashimi' },
    { title: 'DRINK&DESSERTS', path: '#DrinkDesserts' },
    { title: 'WINE LIST', path: '#Wine' },
    { title: 'ACCESS', path: '#Access' },
  ],
  fr: [
    { title: 'MENUS', path: '#Menu' },
    { title: 'HORS D’ŒUVRES', path: '#Starters' },
    { title: 'SUSHI&SASHIMI', path: '#SushiSashimi' },
    { title: 'BOISSON&DESSERTS', path: '#DrinkDesserts' },
    { title: 'CARTE DES VINS', path: '#Wine' },
    { title: 'ACCESS', path: '#Access' },
  ],
  jp: [
    { title: '定食', path: '#Menu' },
    { title: '前菜＆一品', path: '#Starters' },
    { title: '寿司＆刺身', path: '#SushiSashimi' },
    { title: '飲み物＆デザート', path: '#DrinkDesserts' },
    { title: 'ワインリスト', path: '#Wine' },
    { title: 'アクセス', path: '#Access' },
  ],
}

const langs: LangItem[] = [
  {
    title: 'FR',
    path: '/sushimarche',
  },
  {
    title: 'EN',
    path: '/en/sushimarche',
  },
  {
    title: 'JP',
    path: '/jp/sushimarche',
  },
]

const NavbarMarche = () => {
  const pathname = usePathname()
  const [language, setLanguage] = useState<'en' | 'fr' | 'jp'>('fr')
  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (pathname.startsWith('/en')) {
      setLanguage('en')
    } else if (pathname.startsWith('/jp')) {
      setLanguage('jp')
    } else {
      setLanguage('fr')
    }
  }, [pathname])

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = 0
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      console.error(`Element with id ${id} not found`)
    }
  }

  const toggleFunction = () => {
    setOpen((prevState) => !prevState)
    setIsActive(!isActive)
  }

  return (
    <div className={styles.NavbarMarche}>
      <div className={styles.Navbar_container}>
        <Link href="/">
          <div className={styles.Navbar_logoContainer}>
            <div className={styles.imgContainer}>
              <Image
                src="/images/sushimarche.png"
                alt="sushimarche logo"
                width={150}
                height={0}
                style={{ width: 'auto', height: 'auto' }}
                className={styles.img}
                priority={true}
              />
            </div>
            <div className={styles.title}>Sushi Marché</div>
          </div>
        </Link>

        <ul className={styles.Navbar_list}>
          {links[language].map((link: LinkItem) => (
            <li key={link.title} className={styles.li}>
              <a
                href={link.path}
                onClick={(e) => {
                  e.preventDefault()
                  handleScroll(link.path.substring(1))
                }}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <ul className={styles.Navbar_list_right}>
          <li className={styles.langFlex}>
            {langs.map((lang: LangItem, index: number) => (
              <span key={lang.title} className={styles.langItem}>
                <Link
                  href={lang.path}
                  className={`${styles.langTitle} ${
                    pathname.startsWith(lang.path) ? styles.activeLang : ''
                  }`}
                >
                  {lang.title}
                </Link>
                {index < langs.length - 1 && ' | '}
              </span>
            ))}
          </li>
          <li className={styles.sushiGourmetLink}>
            <Link
              href={`/${language === 'fr' ? '' : language + '/'}sushigourmet`}
            >
              Sushi Gourmet
            </Link>
          </li>
        </ul>
        <Image
          src="/images/menu.png"
          alt=""
          width={30}
          height={30}
          onClick={() => setOpen((prev) => !prev)}
          className={styles.menuButton}
        />
        {/* <div
          className={`openbtn1 ${isActive ? 'active' : ''}`}
          onClick={toggleFunction}
        >
          <span></span>
          <span></span>
        </div> */}

        {open && (
          <div className={styles.mobileLinks}>
            {links[language].map((link: LinkItem) => (
              <NavLink
                item={link}
                key={link.title}
                onClick={() => setOpen(false)}
              />
            ))}
            {langs.map((lang: LangItem) => (
              <NavLinkLang item={lang} key={lang.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NavbarMarche
