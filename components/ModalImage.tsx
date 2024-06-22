import Image from 'next/image'
import styles from './styles.module.css'

interface SetImageProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  url: string
  alt: string
}
const ModalImage: React.FC<SetImageProps> = ({ show, setShow, url, alt }) => {
  const handleCloseModal = () => {
    setShow(false) // ウィンドウを閉じる
  }

  if (show) {
    return (
      <div className={styles.overlay} onClick={handleCloseModal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_container}>
            <div
              style={{ position: 'relative' }}
              className={`${styles.imgContainer} w-full aspect-video overflow-hidden`}
            >
              <Image
                src={url}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
                className={`${styles.Zoom} object-cover object-center`}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalImage
