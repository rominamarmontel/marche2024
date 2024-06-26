import styles from '@/components/menu.module.css'
import { TMarche } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import ModalImage from '@/components/ModalImage'

interface SetMenuALaCarteProps {
  marches: TMarche[]
}

const MenuJPSetMenu: React.FC<SetMenuALaCarteProps> = ({ marches }) => {
  const [showImage, setShowImage] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const category = 'Set menu & a la Carte'
  const genreOrder = ['set-menu']
  const genreMapping: { [key: string]: string } = {
    'set-menu': '定食',
  }
  const openModal = (url: string) => {
    setShowImage(true)
    setSelectedImage(url)
  }

  const groupedMarches = marches.reduce((acc, marche) => {
    if (marche.category?.catName === category) {
      const genre = marche.genre || 'Unknown Genre'
      if (!acc[genre]) {
        acc[genre] = []
      }
      acc[genre].push(marche)
    }
    return acc
  }, {} as Record<string, TMarche[]>)

  return (
    <div className={styles.SetMenu} id="Menu">
      <div className={styles.container}>
        <div key={category}>
          <h2 className={styles.category_jp}>定食 & 単品</h2>
          {Object.entries(groupedMarches)
            .sort((a, b) => {
              return genreOrder.indexOf(a[0]) - genreOrder.indexOf(b[0])
            })
            .map(([genre, marches]) => (
              <div key={genre}>
                <h3 className={styles.genre_jp}>
                  {genreMapping[genre] || genre.toUpperCase()}
                </h3>
                <div className={styles.midiSoir}>
                  <p>Midi / Soir</p>
                </div>
                <div className={styles.flexContainer}>
                  {marches.map((marche) => (
                    <div key={marche._id} className={styles.flexBox}>
                      <div
                        style={{ position: 'relative' }}
                        className={styles.imgContainer}
                      >
                        {marche.imageData && marche.imageData.length > 0 ? (
                          <button
                            onClick={() => openModal(marche.imageData![0].url)}
                          >
                            <Image
                              src={marche.imageData[0].url}
                              alt={marche.title.en}
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
                        <div className={styles.flexBox2Container}>
                          <p className={styles.title}>{marche.title.jp}</p>
                          <div className={styles.price}>
                            <p>
                              {marche.priceLunch &&
                                parseFloat(marche.priceLunch)
                                  .toFixed(2)
                                  .replace('.', ',')}
                              €
                            </p>
                            <p>/</p>
                            <p>
                              {marche.price &&
                                parseFloat(marche.price)
                                  .toFixed(2)
                                  .replace('.', ',')}
                              €
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className={styles.detail}>{marche.detail?.jp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className={styles.SetMenu_text}>
          <p className={styles.text_2_jp}>
            昼はサラダと味噌汁付
            <br />
            夜は味噌汁とデザート付
          </p>
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

export default MenuJPSetMenu
