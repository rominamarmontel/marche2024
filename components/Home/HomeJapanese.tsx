import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'

const JapaneseContent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.right_restaurant}>
        <div className={styles.logo}>
          <Link href="./jp/sushimarche">
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
          <Link href="./jp/sushigourmet">
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
        <p className={styles.depuis_jp}>パリ創業2000年</p>
        <p className={styles.right_text_top_jp}>
          2000年12月14日、誠実をモットーに寿司グルメ Sushi Gourmet
          をオープン。2008年3月16日には2号店、寿司マルシェ Sushi Marché
          をオープン。今では地域の人びと、ラジオフランス、各国大使館、OECD
          、駐在員の方々に愛されています。
        </p>
      </div>
      <div>
        <p className={styles.right_text_bottom_jp}>
          八木幸春（やぎゆきはる） 1963宮城県東松島市生まれ。
          <br />
          仙台レストラン「ノア」（現在は閉店）にて、
          胸組泰夫（むねぐみやすお）氏に師事 。 <br />
          1993年渡仏。 ボルドーのシャトーレストランに勤務後、
          パリの日本食レストランにて調理を担当。
          <br />
          フランス料理アカデミー会員。
          <br />
        </p>
      </div>
    </div>
  )
}

export default JapaneseContent
