import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'

const FrenchContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.right_restaurant}>
        <div className={styles.logo}>
          <Link href="./sushimarche">
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
          <Link href="./sushigourmet">
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
        <p className={styles.depuis}>PARIS DEPUIS 2000</p>
        <p className={styles.right_text_top}>
          Sushi Gourmet a été créé le 14 décembre 2000 avec l’enthousiasme de
          découvrir la cuisine japonaise authentique. Notre deuxième restaurant
          Sushi Marché a été inauguré le 16 mars 2008. Maintenant, un de nos
          clients fidèles sont les résidents, les journalistes, les artistes de
          Radio France, les ambassades et l’OCDE, les employés des entreprises
          internationales, et beaucoup d’autres.
        </p>
      </div>
      <div>
        <p className={styles.right_text_bottom}>
          Yukiharu YAGI est né en 1963 à Higashi-Matsushima, Miyagi JAPON.
          <br />
          Il a travaillé sous la direction de Yasuo MUNEGUMI dans le restaurant
          NOIX (maintenant fermé) à SENDAI.
          <br />
          Il est venu en France en 1993 pour travailler dans le restaurant d’un
          château de Bordeaux, puis il a déménagé à Paris pour travailler dans
          divers restaurants japonais. Membre de l’Académie Culinaire de France.
        </p>
      </div>
    </div>
  )
}

export default FrenchContent
