import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'

const EnglishContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.right_restaurant}>
        <div className={styles.logo}>
          <Link href="./en/sushimarche">
            <div className="text-center mb-3">
              <div
                style={{ position: 'relative' }}
                className={styles.imgContainer_marche}
              >
                <Image
                  src="/images/sushiMarche_yoko.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                  className={styles.img}
                  priority
                />
              </div>
              <div className={styles.title}>SUSHI MARCHE</div>
            </div>
            <div className={styles.imgContainer}>
              <Image
                src="/images/sushimarche.png"
                alt="about-image"
                fill
                priority={true}
                className={styles.img}
              />
            </div>
          </Link>
        </div>
        <div className={styles.logo}>
          <Link href="./en/sushigourmet">
            <div className="text-center mb-3">
              <div
                style={{ position: 'relative' }}
                className={styles.imgContainer_gourmet}
              >
                <Image
                  src="/images/sushiGourmet_yoko.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                  className={styles.img}
                  priority
                />
              </div>
              <div className={styles.title}>SUSHI GOURMET</div>
            </div>
            <div className={styles.imgContainer}>
              <Image
                src="/images/sushigourmet.png"
                alt="about-image"
                fill
                priority={true}
                className={styles.img}
              />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.text_container}>
        <p className={styles.depuis}>PARIS SINCE 2000</p>
        <p className={styles.right_text_top}>
          Sushi Gourmet was created December 14th, 2000 with the enthusiasm to
          discover authentic Japanese cuisine.Our second restaurant Sushi Marché
          was inaugurated on 16 March 2008. Now, one of our loyal customers are
          the residents, journalists, Radio France artists, those embassies and
          OECD, employees of international companies, many others.
        </p>
      </div>
      <div>
        <p className={styles.right_text_bottom}>
          Yukiharu YAGI was born in 1963 in Higashi-Matsushima, Miyagi JAPAN.{' '}
          <br />
          He worked under the direction of Yasuo MUNEGUMI in the restaurant NOIX
          (now closed) in SENDAI. <br />
          He came to France in 1993 to work in the restaurant of a Bordeaux
          chateau, he then moved to Paris to work in various Japanese
          restaurants. Member of The Culinary Academy of France.
        </p>
      </div>
    </div>
  )
}

export default EnglishContent
