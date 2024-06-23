import Menu from '@/components/Gourmet/Menu'
import SwiperMenu from '@/components/SwiperMenu'
import dataSlider from '@/data/slider-data.json'
import Access from '@/components/Gourmet/Access'
import styles from './styles.module.css'
import ScrollToTop from '@/components/ScrollToTop'

const page = () => {
  return (
    <div className={styles.container}>
      <SwiperMenu data={dataSlider} />
      <Menu />
      <Access />
      <ScrollToTop />
    </div>
  )
}

export default page
