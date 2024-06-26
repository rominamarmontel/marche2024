import styles from '@/components/menu.module.css'
import { TGourmet } from '@/types'
import MenuEnglishSetMenu from './MenuEnglishSetMenu'
import MenuEnglishStarters from './MenuEnglishStarters'
import MenuEnglishSushiSashimi from './MenuEnglishSushiSashimi'
import MenuEnglishDrinkDessert from './MenuEnglishDrinkDessert'

interface MenuFrenchProps {
  gourmets: TGourmet[]
}
const MenuFrench: React.FC<MenuFrenchProps> = ({ gourmets }) => {
  return (
    <div className={styles.MenuFrench}>
      <MenuEnglishSetMenu gourmets={gourmets} />
      <MenuEnglishStarters gourmets={gourmets} />
      <MenuEnglishSushiSashimi gourmets={gourmets} />
      <MenuEnglishDrinkDessert gourmets={gourmets} />
    </div>
  )
}

export default MenuFrench
