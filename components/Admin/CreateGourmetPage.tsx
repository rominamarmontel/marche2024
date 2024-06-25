'use client'

import styles from './create.module.css'
import { useState, useEffect } from 'react'
import { TCategory } from '@/types'
import { useRouter } from 'next/navigation'
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

const categoryGenresMap: Record<string, string[]> = {
  'Set menu & a la Carte': ['set-menu'],
  'Starters & Small Plates': ['starters', 'rice', 'yakitori'],
  'Sushi & Sashimi': ['sushi', 'sashimi', 'maki-temaki'],
  'Drinks & Desserts': [
    'japanese-sake',
    'japanese-beer',
    'wine',
    'soft-drinks',
    'desserts',
  ],
}
const CreateGourmetPage = () => {
  const [categories, setCategories] = useState<TCategory[]>([])
  const [category, setCategory] = useState('-1')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categoryError, setCategoryError] = useState(false)
  const [genre, setGenre] = useState('')
  const [titles, setTitles] = useState<{ en: string; fr: string; jp: string }>({
    en: '',
    fr: '',
    jp: '',
  })
  const [titleEnError, setTitleEnError] = useState(false)
  const [titleFrError, setTitleFrError] = useState(false)
  const [titleJpError, setTitleJpError] = useState(false)
  const [details, setDetails] = useState<{
    en: string
    fr: string
    jp: string
  }>({
    en: '',
    fr: '',
    jp: '',
  })
  const [price, setPrice] = useState<string>('')
  const [priceLunch, setPriceLunch] = useState<string>('')
  const [priceError, setPriceError] = useState<string>('')
  const [error, setError] = useState(false)
  const [volume, setVolume] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageData, setImageData] = useState<
    { url: string; publicId: string }[]
  >([])
  const router = useRouter()

  useEffect(() => {
    const fetchAllCategoris = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/categories`,
        {
          cache: 'no-store',
        }
      )
      const catName = await res.json()
      setCategories(catName)
    }
    if (categories.length === 0) {
      fetchAllCategoris()
    }
  }, [categories])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setCategory(selectedValue)
    if (selectedValue === '-1') {
      setCategoryError(true)
    } else {
      setCategoryError(false)
    }
    setSelectedCategory(selectedValue)
    setGenre('')
  }

  const handleTitleChangeEn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitles({ ...titles, en: e.target.value })
  }
  const handleTitleChangeFr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitles({ ...titles, fr: e.target.value })
  }
  const handleTitleChangeJp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitles({ ...titles, jp: e.target.value })
  }
  const handleDetailChangeEn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, en: e.target.value })
  }
  const handleDetailChangeFr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, fr: e.target.value })
  }
  const handleDetailChangeJp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, jp: e.target.value })
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (isNaN(Number(newValue))) {
      toast.error(
        `Price must be a valid number\n価格は半角数字を入力してください`
      )
      return
    }
    setPrice(newValue)
  }

  const handlePriceLunchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (isNaN(Number(newValue))) {
      toast.error(
        `Price must be a valid number\n価格は半角数字を入力してください`
      )
      return
    }
    setPriceLunch(newValue)
  }
  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object
    if ('secure_url' in info && 'public_id' in info) {
      const url = info.secure_url as string
      const publicId = info.public_id as string
      setImageData([{ url, publicId }])
    }
  }
  const removeImage = async (index: number) => {
    try {
      const res = await fetch(`/api/removeImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicIds: [imageData[index].publicId] }),
      })
      if (res.ok) {
        setImageData((prev) => prev.filter((_, i) => i !== index))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Selected Genre:', genre)
    if (category === '-1') {
      const errorMessage = 'category is required\nカテゴリーを選択してください'
      toast.error(errorMessage)
      setCategoryError(true)
      return
    }
    if (titles.en.trim() === '') {
      const errorMessage =
        'Title (English) is required\nメニューの英語タイトルを入力してください'
      toast.error(errorMessage)
      setTitleEnError(true)
      return
    }
    if (titles.fr.trim() === '') {
      const errorMessage =
        'Title (French) is required\nメニューの仏語タイトルを入力してください'
      toast.error(errorMessage)
      setTitleFrError(true)
      return
    }
    if (titles.jp.trim() === '') {
      const errorMessage =
        'Title (Japanese) is required\nメニューの日本語タイトルを入力してください'
      toast.error(errorMessage)
      setTitleJpError(true)
      return
    }
    if (!price || price === '0' || priceLunch === '0') {
      const errorMessage = 'Price is required\n価格を入力してください'
      toast.error(errorMessage)
      setPriceError('Price is required')
      return
    }
    if (isNaN(Number(price)) || isNaN(Number(priceLunch))) {
      const errorMessage =
        'Price and lunch price must be valid numbers\n価格は半角数字を入力してください'
      toast.error(errorMessage)
      setError(true)
      return
    }
    const formattedPrice = parseFloat(price)
    const formattedPriceLunch = parseFloat(priceLunch)
    const titlesString = JSON.stringify(titles)
    const detailsString = JSON.stringify(details)
    console.log({
      category,
      genre,
      title: titlesString,
      detail: detailsString,
      price: formattedPrice,
      priceLunch: formattedPriceLunch,
      volume,
      imageData,
    })

    try {
      const res = await fetch('/api/gourmets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          genre,
          title: titlesString,
          detail: detailsString,
          price: formattedPrice,
          priceLunch: formattedPriceLunch,
          volume,
          imageData,
        }),
      })
      if (res.ok) {
        toast.success('Gourmet created successfully')
        router.push('/admin')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.CreateGourmetPage}>
      <div className={styles.container}>
        <div className="bg-stone-300 flex flex-col items-center pb-4">
          <div className={`${styles.title}`}>SUSHI GOURMET CREATE</div>
          <Image
            src="/images/sushigourmet.png"
            alt="sushigourmet"
            width={100}
            height={50}
          />
        </div>
        <div className="text-right text-sm pt-2 px-2">
          <span className="text-pink-600 font-bold">*</span>必須項目
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">
              CATEGORY
              <span className="text-pink-600 font-bold">*</span>
            </label>
            <select
              onChange={handleCategoryChange}
              className={
                selectedCategory === '-1'
                  ? styles.error_border_select
                  : styles.form_select
              }
              value={selectedCategory}
            >
              <option value="-1" className={styles.option}>
                Choose a category | カテゴリーを選択してください
              </option>
              {categories &&
                categories.map((category: TCategory) => (
                  <option key={category._id} value={category.catName}>
                    {category.catName}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="genre">
              GENRE<span className="text-pink-600 font-bold">*</span>
            </label>
            <select
              onChange={(e) => setGenre(e.target.value)}
              className={styles.form_select}
              disabled={!selectedCategory || selectedCategory === '-1'}
            >
              <option value="-1">
                Choose a genre | ジャンルを選択してください
              </option>
              {selectedCategory &&
                selectedCategory !== '-1' &&
                categoryGenresMap[selectedCategory].map((genre) => (
                  <option key={genre} value={genre.toLowerCase()}>
                    {genre}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex gap-2">
            <div className={`${styles.formGroup} flex-1`}>
              <label className={styles.label} htmlFor="titleEn">
                MENU (English)
                <span className="text-pink-600 font-bold">*</span>
              </label>
              <input
                onChange={handleTitleChangeEn}
                type="text"
                placeholder="e.g. SASHIMI ROYAL"
                className={
                  titleEnError ? styles.error_border : styles.form_input
                }
              />
            </div>
            <div className={`${styles.formGroup} flex-1`}>
              <label className={styles.label} htmlFor="titleFr">
                MENU (French)
                <span className="text-pink-600 font-bold">*</span>
              </label>
              <input
                onChange={handleTitleChangeFr}
                type="text"
                placeholder="e.g. SASHIMI ROYAL"
                className={
                  titleFrError ? styles.error_border : styles.form_input
                }
              />
            </div>
            <div className={`${styles.formGroup} flex-1`}>
              <label className={styles.label} htmlFor="titleJp">
                MENU (Japanese)
                <span className="text-pink-600 font-bold">*</span>
              </label>
              <input
                onChange={handleTitleChangeJp}
                type="text"
                placeholder="e.g. 刺身ロワイヤル"
                className={
                  titleJpError ? styles.error_border : styles.form_input
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className={`${styles.formGroup} flex-1`}>
              <label className={styles.label} htmlFor="detailEn">
                DETAILS (English)
              </label>
              <input
                onChange={handleDetailChangeEn}
                type="text"
                placeholder="e.g. Sliced raw fishes superior"
                className={styles.form_input}
              />
            </div>
            <div className={`${styles.formGroup} flex-1`}>
              <label className={styles.label} htmlFor="detailFr">
                DETAILS (French)
              </label>
              <input
                onChange={handleDetailChangeFr}
                type="text"
                placeholder="e.g. Tranches de poissons crus Supérieurs"
                className={styles.form_input}
              />
            </div>
            <div className={`${styles.formGroup} flex-1`}>
              <label className={styles.label} htmlFor="detailJp">
                DETAILS (Japanese)
              </label>
              <input
                onChange={handleDetailChangeJp}
                type="text"
                placeholder="e.g. 刺身の盛り合わせ"
                className={styles.form_input}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className={`${styles.formGroup} `}>
              <label className={styles.label} htmlFor="price">
                PRICE (EUR)<span className="text-pink-600 font-bold">*</span>
              </label>
              <div className="flex items-center">
                <input
                  onChange={handlePriceChange}
                  type="number"
                  placeholder="e.g. 33.00"
                  value={price}
                  className={
                    priceError ? styles.error_border_price : styles.form_input
                  }
                />
                <span className={`${styles.currency} px-1`}>€</span>
              </div>
            </div>
            <div className={`${styles.formGroup} `}>
              <label className={styles.label} htmlFor="priceLunch">
                LUNCH PRICE (EUR)
              </label>
              <div className="flex items-center">
                <input
                  onChange={handlePriceLunchChange}
                  type="number"
                  placeholder="e.g. 25.00"
                  value={priceLunch}
                  className={styles.form_input}
                />
                <span className={`${styles.currency} px-1`}>€</span>
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="volume">
              VOLUME
            </label>
            <input
              onChange={(e) => setVolume(e.target.value)}
              type="text"
              placeholder="e.g. 25cl"
              className={styles.form_input}
            />
          </div>
          <div className="relative">
            <label className={styles.image} htmlFor="image">
              IMAGE (JPEG/PNG/TIFF)
            </label>
            <CldUploadButton
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onUpload={handleImageUpload}
              className={`h-48 w-full border-2 mt-4 border-dotted grid place-items-center bg-slate-100 ${
                imageUrl && 'pointer-events-none'
              }`}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
            </CldUploadButton>
            {imageData.map((image, index) => (
              <div
                key={index}
                className="relative"
                style={{ display: 'inline-block' }}
              >
                <Image src={image.url} alt={''} width={150} height={150} />
                <span
                  onClick={() => removeImage(index)}
                  className="m-1 w-7 h-7 absolute top-0 right-0 text-white cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
          <div className={styles.formGroup}>
            <button
              type="submit"
              className={`${styles.button} primary-btn mt-10`}
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGourmetPage
