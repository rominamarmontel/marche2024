import styles from '@/components/menu.module.css'
import { TGourmet } from '@/types'
import MenuJpSetMenu from './MenuJpSetMenu'
import MenuJpStarters from './MenuJpStarters'
import MenuJpSushiSashimi from './MenuJpSushiSashimi'
import MenuJpDrinkDessert from './MenuJpDrinkDessert'

interface MenuFrenchProps {
  gourmets: TGourmet[]
}
const MenuFrench: React.FC<MenuFrenchProps> = ({ gourmets }) => {
  return (
    <div className={styles.MenuFrench}>
      <MenuJpSetMenu gourmets={gourmets} />
      <MenuJpStarters gourmets={gourmets} />
      <MenuJpSushiSashimi gourmets={gourmets} />
      <MenuJpDrinkDessert gourmets={gourmets} />
    </div>
  )
}

export default MenuFrench
