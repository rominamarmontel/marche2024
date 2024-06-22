'use client'

import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Zoom,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import Image from 'next/image'
import styles from './styles.module.css'
import { usePathname } from 'next/navigation'

interface Slide {
  id: number
  image: string
}
interface DemoSliderProps {
  data: Slide[]
}
const SwiperMenu: React.FC<DemoSliderProps> = ({ data }) => {
  const pathname = usePathname()

  return (
    <div className={styles.Swiper}>
      <Swiper
        zoom={true}
        navigation={false}
        effect={'fade'}
        speed={1000}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        modules={[Zoom, Navigation, Pagination, Autoplay, EffectFade]}
      >
        {data.map(({ id, image }) => (
          <SwiperSlide key={id}>
            <Image
              src={image}
              alt={`slide-${id}`}
              width={0}
              height={0}
              sizes="100vw"
              priority={true}
              style={{ width: '100vw', height: '93vh', objectFit: 'cover' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {(pathname === '/sushimarche' ||
        pathname === '/en/sushimarche' ||
        pathname === '/jp/sushimarche') && (
        <div className={styles.overlayText}>
          <div className={styles.overlayContainer}>
            <p className={styles.welcome}>
              WELCOME | BIENVENUE | <span>ようこそ</span>
            </p>
            <div
              style={{ position: 'relative' }}
              className={styles.imgContainer}
            >
              <Image
                src="/images/sushiMarche_ok.png"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                className={styles.img}
                priority
              />
            </div>
            <div className={styles.reservation}>
              <p className={styles.tel}>TEL. 01 42 88 11 49</p>
            </div>
          </div>
        </div>
      )}
      {(pathname === '/sushigourmet' ||
        pathname === '/jp/sushigourmet' ||
        pathname === '/en/sushigourmet') && (
        <div className={styles.overlayText}>
          <div className={styles.overlayContainer}>
            <p className={styles.welcome}>
              WELCOME | BIENVENUE | <span>ようこそ</span>
            </p>
            <div
              style={{ position: 'relative' }}
              className={styles.imgContainer_gourmet}
            >
              <Image
                src="/images/sushiGourmet_ok.png"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                className={styles.img}
                priority
              />
            </div>
            <div className={styles.reservation}>
              <p className={styles.tel}>TEL. 01 45 27 09 02</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SwiperMenu
