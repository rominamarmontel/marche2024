import styles from '../menu.module.css'
import { TGourmet } from '@/types'
import MenuFrenchSetMenu from './MenuFrenchSetMenu'
import MenuFrenchStarters from './MenuFrenchStarters'
import MenuFrenchSushiSashimi from './MenuFrenchSushiSashimi'
import MenuFrenchDrinkDessert from './MenuFrenchDrinkDessert'

interface MenuFrenchProps {
  gourmets: TGourmet[]
}
const MenuFrench: React.FC<MenuFrenchProps> = ({ gourmets }) => {
  return (
    <div className={styles.MenuFrench}>
      <MenuFrenchSetMenu gourmets={gourmets} />
      <MenuFrenchStarters gourmets={gourmets} />
      <MenuFrenchSushiSashimi gourmets={gourmets} />
      <MenuFrenchDrinkDessert gourmets={gourmets} />
    </div>
  )
}

export default MenuFrench
