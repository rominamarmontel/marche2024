import Menu from '@/components/Marche/Menu'
import SwiperMenu from '@/components/SwiperMenu'
import dataSlider from '@/data/slider-data.json'
import Access from '@/components/Gourmet/Access'
import styles from './styles.module.css'

const page = () => {
  return (
    <div className={styles.container}>
      <SwiperMenu data={dataSlider} />
      <Menu />
      <Access />
    </div>
  )
}

export default page
