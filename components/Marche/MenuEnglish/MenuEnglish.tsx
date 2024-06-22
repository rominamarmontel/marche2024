import styles from '../menu.module.css'
import { TMarche } from '@/types'
import MenuEnglishSetMenu from './MenuEnglishSetMenu'
import MenuEnglishStarters from './MenuEnglishStarters'
import MenuEnglishSushiSashimi from './MenuEnglishSushiSashimi'
import MenuEnglishDrinkDessert from './MenuEnglishDrinkDessert'
import MenuEnglishWine from './MenuEnglishWine'

interface MenuEnglishProps {
  marches: TMarche[]
}
const MenuEnglish: React.FC<MenuEnglishProps> = ({ marches }) => {
  return (
    <div className={styles.MenuFrench}>
      <MenuEnglishSetMenu marches={marches} />
      <MenuEnglishStarters marches={marches} />
      <MenuEnglishSushiSashimi marches={marches} />
      <MenuEnglishDrinkDessert marches={marches} />
      <MenuEnglishWine marches={marches} />
    </div>
  )
}

export default MenuEnglish
