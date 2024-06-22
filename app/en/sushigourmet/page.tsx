import SwiperMenu from '@/components/SwiperMenu'
import dataSlider from '@/data/slider-data.json'
import Access from '@/components/Gourmet/Access'
import Menu from '@/components/Gourmet/Menu'

const page = () => {
  return (
    <div className="SushiGourmet-Home">
      <SwiperMenu data={dataSlider} />
      <Menu />
      <Access />
    </div>
  )
}

export default page
