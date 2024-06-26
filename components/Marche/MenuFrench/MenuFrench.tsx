import styles from '@/components/menu.module.css'
import { TGourmet, TMarche } from '@/types'
import MenuFrenchSetMenu from './MenuFrenchSetMenu'
import MenuFrenchStarters from './MenuFrenchStarters'
import MenuFrenchSushiSashimi from './MenuFrenchSushiSashimi'
import MenuFrenchDrinkDessert from './MenuFrenchDrinkDessert'
import MenuFrenchWine from './MenuFrenchWine'

interface MenuFrenchProps {
  marches: TMarche[]
}
const MenuFrench: React.FC<MenuFrenchProps> = ({ marches }) => {
  return (
    <div className={styles.MenuFrench}>
      <MenuFrenchSetMenu marches={marches} />
      <MenuFrenchStarters marches={marches} />
      <MenuFrenchSushiSashimi marches={marches} />
      <MenuFrenchDrinkDessert marches={marches} />
      <MenuFrenchWine marches={marches} />
    </div>
  )
}

export default MenuFrench
