import styles from '@/components/menu.module.css'
import { TGourmet } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import ModalImage from '@/components/ModalImage'

interface DrinkDessertProps {
  gourmets: TGourmet[]
}

const MenuEnglishDrinkDessert: React.FC<DrinkDessertProps> = ({ gourmets }) => {
  const [showImage, setShowImage] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const category = 'Drinks & Desserts'
  const genreOrder = [
    'japanese-sake',
    'japanese-beer',
    'wine',
    'soft-drinks',
    'desserts',
  ]
  const genreMapping: { [key: string]: string } = {
    'japanese-sake': 'Japanese Sake',
    'japanese-beer': 'Japanese Beer',
    'wine': 'Wine',
    'soft-drinks': 'Soft Drinks',
    'desserts': 'Desserts',
  }

  const openModal = (url: string) => {
    setShowImage(true)
    setSelectedImage(url)
  }

  const groupedGourmets = gourmets.reduce((acc, gourmet) => {
    if (gourmet.category?.catName === category) {
      const genre = gourmet.genre || 'Unknown Genre'
      const title = gourmet.title.en
      if (!acc[genre]) {
        acc[genre] = {}
      }
      if (!acc[genre][title]) {
        acc[genre][title] = []
      }
      acc[genre][title].push(gourmet)
    }
    return acc
  }, {} as Record<string, Record<string, TGourmet[]>>)

  return (
    <div className={styles.DrinkDessert} id="DrinkDesserts">
      <div className={styles.container}>
        <div key={category}>
          <h2 className={styles.category}>DRINKS & DESSERTS</h2>
          {Object.entries(groupedGourmets)
            .sort((a, b) => {
              return genreOrder.indexOf(a[0]) - genreOrder.indexOf(b[0])
            })
            .map(([genre, titles]) => (
              <div key={genre}>
                <h3 className={styles.genre}>
                  {genreMapping[genre] || genre.toUpperCase()}
                </h3>

                <div className={styles.flexContainer}>
                  {Object.entries(titles).map(([title, items], index) => (
                    <div key={index} className={styles.flexBox}>
                      <div
                        style={{ position: 'relative' }}
                        className={styles.imgContainer}
                      >
                        {items[0].imageData && items[0].imageData.length > 0 ? (
                          <button
                            onClick={() =>
                              openModal(items[0].imageData![0].url)
                            }
                          >
                            <Image
                              src={items[0].imageData[0].url}
                              alt={items[0].title.en}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                              className={styles.img}
                              priority
                            />
                          </button>
                        ) : (
                          <div
                            className="bg-transparent"
                            style={{ width: '100%', height: '100%' }}
                          />
                        )}
                      </div>

                      <div className={styles.flexBox2}>
                        <p className={styles.title}>{title.toUpperCase()}</p>
                        <div className={styles.flexBox2ContainerDrink}>
                          <div className={styles.detail}>
                            {items.map((item, idx) => (
                              <p key={idx}>
                                {item.detail?.en ? item.detail.en : item.volume}
                              </p>
                            ))}
                          </div>
                          <div className={styles.priceDrink}>
                            {items.map((item, idx) => (
                              <p key={idx}>
                                {item.price &&
                                  parseFloat(item.price)
                                    .toFixed(2)
                                    .replace('.', ',')}
                                €
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      {showImage && selectedImage && (
        <ModalImage
          show={showImage}
          setShow={setShowImage}
          url={selectedImage}
          alt="Selected Image"
        />
      )}
    </div>
  )
}

export default MenuEnglishDrinkDessert
