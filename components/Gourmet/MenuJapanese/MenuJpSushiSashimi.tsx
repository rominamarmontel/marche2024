import styles from '../menu.module.css'
import { TGourmet } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import ModalImage from '@/components/ModalImage'

interface SushiSashimiProps {
  gourmets: TGourmet[]
}

const MenuJpSushiSashimi: React.FC<SushiSashimiProps> = ({ gourmets }) => {
  const [showImage, setShowImage] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const category = 'Sushi & Sashimi'
  const genreOrder = ['sushi', 'sashimi', 'maki-temaki']
  const genreMapping: { [key: string]: string } = {
    'sushi': '寿司',
    'sashimi': '刺身',
    'maki-temaki': '巻き & 手巻き',
  }

  const openModal = (url: string) => {
    setShowImage(true)
    setSelectedImage(url)
  }
  const groupedGourmets = gourmets.reduce((acc, gourmet) => {
    if (gourmet.category?.catName === category) {
      const genre = gourmet.genre || 'Unknown Genre'
      if (!acc[genre]) {
        acc[genre] = []
      }
      acc[genre].push(gourmet)
    }
    return acc
  }, {} as Record<string, TGourmet[]>)

  return (
    <div className={styles.SushiSashimi} id="SushiSashimi">
      <div className={styles.container}>
        <div key={category}>
          <h2 className={styles.category_jp}>寿司 & 刺身</h2>

          {Object.entries(groupedGourmets)
            .sort((a, b) => {
              return genreOrder.indexOf(a[0]) - genreOrder.indexOf(b[0])
            })
            .map(([genre, gourmets]) => (
              <div key={genre}>
                <h3 className={styles.genre_jp}>
                  {genreMapping[genre] || genre.toUpperCase()}
                </h3>

                <div className={styles.flexContainer}>
                  {gourmets.map((gourmet) => (
                    <div key={gourmet._id} className={styles.flexBox}>
                      <div
                        style={{ position: 'relative' }}
                        className={styles.imgContainer}
                      >
                        {gourmet.imageData && gourmet.imageData.length > 0 ? (
                          <button
                            onClick={() => openModal(gourmet.imageData![0].url)}
                          >
                            <Image
                              src={gourmet.imageData[0].url}
                              alt={gourmet.title.en}
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
                          <p className={styles.title}>
                            {gourmet.title.jp.toUpperCase()}
                          </p>
                          <div className={styles.price}>
                            <p>
                              {gourmet.price &&
                                parseFloat(gourmet.price)
                                  .toFixed(2)
                                  .replace('.', ',')}
                              €
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className={styles.detail}>{gourmet.detail?.jp}</p>
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

export default MenuJpSushiSashimi
