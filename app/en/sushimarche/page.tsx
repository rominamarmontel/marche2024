import SwiperMenu from '@/components/SwiperMenu'
import dataSlider from '@/data/slider-data.json'
import Access from '@/components/Marche/Access'
import Menu from '@/components/Marche/Menu'

const page = () => {
  return (
    <div className="SushiMarche-Home">
      <SwiperMenu data={dataSlider} />
      <Menu />
      <Access />
    </div>
  )
}

export default page
