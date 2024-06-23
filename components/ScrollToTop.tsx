'use client'

import { useEffect, useState } from 'react'
import { SlArrowUp } from 'react-icons/sl'
import styles from './styles.module.css'

const PAGE_Y_OFFSET = 500

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  const changeShow = () => {
    console.log('Window Scroll Y:', window.scrollY)
    if (window.scrollY > PAGE_Y_OFFSET) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const onScrollTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', changeShow)
    console.log('Scroll Event Listener Added')
    return () => {
      window.removeEventListener('scroll', changeShow)
      console.log('Scroll Event Listener Removed')
    }
  }, [])

  if (show) {
    console.log('Show ScrollToTop Button')
    return (
      <div
        style={{ position: 'fixed', bottom: 20, right: 15, zIndex: 3 }}
        className={styles.scrollToTop}
      >
        <SlArrowUp
          onClick={onScrollTop}
          className={styles.scrollToTopIcon}
          style={{
            backgroundColor: 'transparent',
            color: 'gray',
            fontSize: 46,
          }}
        />
      </div>
    )
  } else {
    console.log('Hide ScrollToTop Button')
    return null
  }
}

export default ScrollToTop
