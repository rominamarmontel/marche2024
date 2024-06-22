import styles from '../menu.module.css'
import { TMarche } from '@/types'
import MenuJpSetMenu from './MenuJpSetMenu'
import MenuJpStarters from './MenuJpStarters'
import MenuJpSushiSashimi from './MenuJpSushiSashimi'
import MenuJpDrinkDessert from './MenuJpDrinkDessert'
import MenuJpWine from './MenuJpWine'

interface MenuJapaneseProps {
  marches: TMarche[]
}
const MenuJapanese: React.FC<MenuJapaneseProps> = ({ marches }) => {
  return (
    <div className={styles.MenuFrench}>
      <MenuJpSetMenu marches={marches} />
      <MenuJpStarters marches={marches} />
      <MenuJpSushiSashimi marches={marches} />
      <MenuJpDrinkDessert marches={marches} />
      <MenuJpWine marches={marches} />
    </div>
  )
}

export default MenuJapanese
