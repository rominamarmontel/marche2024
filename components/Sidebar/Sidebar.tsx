import Link from 'next/link'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import styles from './styles.module.css'

const Sidebar = () => {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header_logo}>
            <div className={styles.imgContainer}>
              <Link href={'/sushimarche'} target={'_blank'}>
                <Image
                  src="/images/sushimarche.png"
                  alt="Logo Sushimarche"
                  width={150}
                  height={100}
                  className={styles.img}
                />
              </Link>
            </div>
            <div className={styles.imgContainer}>
              <Link href={'/sushigourmet'} target={'_blank'}>
                <Image
                  src="/images/sushigourmet.png"
                  alt="Logo Sushigourmet"
                  width={150}
                  height={100}
                  className={styles.img}
                />
              </Link>
            </div>
          </div>

          <ul className={styles.list}>
            <li>
              <Link href="/admin">ADMIN PANEL | 管理者用画面</Link>
            </li>
            <li>
              <Link href="/admin/create-gourmetMenu" className="flex gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={styles.create_logo}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                Create Gourmet
              </Link>
            </li>
            <li>
              <Link href="/admin/create-marcheMenu" className="flex gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={styles.create_logo}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                Create Marche
              </Link>
            </li>
            {/* <li>
              <Link href="/dashboard/create-category">
                <p>Create category</p>
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="btn_container">
          <button onClick={() => signOut()} className="primary-btn">
            Logout / ログアウト
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
