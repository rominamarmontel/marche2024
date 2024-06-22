'use client'

import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { TCategory, TGourmet } from '@/types'
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

const EditGourmetPage = ({ gourmet }: { gourmet: TGourmet }) => {
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
  const [volume, setVolume] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageData, setImageData] = useState<
    { url: string; publicId: string }[]
  >([])
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/categories`
      )
      const catName = await res.json()
      setCategories(catName)
    }
    fetchAllCategories()

    const initValues = () => {
      const categoryCatName = gourmet.category ? gourmet.category.catName : '-1'
      setCategory(categoryCatName)
      setSelectedCategory(categoryCatName)
      setGenre(gourmet.genre || '')
      setTitles(gourmet.title || { en: '', fr: '', jp: '' })
      setDetails(
        typeof gourmet.detail === 'string'
          ? { en: '', fr: '', jp: '' }
          : gourmet.detail || { en: '', fr: '', jp: '' }
      )
      setPrice(gourmet.price || '')
      setPriceLunch(gourmet.priceLunch || '')
      setVolume(gourmet.volume || '')
      setImageData(gourmet.imageData || [])
    }
    initValues()
  }, [gourmet])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value
    setSelectedCategory(selectedCategory)
    setCategory(selectedCategory)
    if (selectedCategory !== '-1') {
      setCategoryError(false)
    }
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

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/gourmets/${gourmet._id}`,
        {
          method: 'PUT',
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
        }
      )
      if (res.ok) {
        toast.success('Update gourmet successfully')
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.CreateGourmetPage}>
      <div className={styles.container}>
        <div className={styles.title}>Edit Gourmet Page</div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">
              カテゴリー / Category
            </label>
            <select
              onChange={handleCategoryChange}
              className={
                selectedCategory === '-1'
                  ? styles.error_border_select
                  : styles.form_select
              }
              value={category}
            >
              <option value="-1">
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
              ジャンル / Genre
            </label>
            <select
              onChange={(e) => setGenre(e.target.value)}
              className={
                !genre ? styles.error_border_select : styles.form_select
              }
              value={genre}
            >
              <option value="">
                Choose a genre | ジャンルを選択してください
              </option>
              {selectedCategory &&
                selectedCategory in categoryGenresMap &&
                categoryGenresMap[selectedCategory].map((genreOption) => (
                  <option key={genreOption} value={genreOption}>
                    {genreOption}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="titleEn">
              メニュー名 (英語) / Title (English)
            </label>
            <input
              type="text"
              id="titleEn"
              className={titleEnError ? styles.error_border : styles.form_input}
              placeholder="e.g. Sushi"
              value={titles.en}
              onChange={(e) => setTitles({ ...titles, en: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="titleFr">
              メニュー名 (仏語) / Title (French)
            </label>
            <input
              type="text"
              id="titleFr"
              className={titleFrError ? styles.error_border : styles.form_input}
              placeholder="e.g. Sushi"
              value={titles.fr}
              onChange={(e) => setTitles({ ...titles, fr: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="titleJp">
              メニュー名 (日本語) / Title (Japanese)
            </label>
            <input
              type="text"
              id="titleJp"
              className={titleJpError ? styles.error_border : styles.form_input}
              placeholder="e.g. Sushi"
              value={titles.jp}
              onChange={(e) => setTitles({ ...titles, jp: e.target.value })}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="detailEn">
              詳細 (英語) / Details (English)
            </label>
            <textarea
              id="detailEn"
              className={styles.form_textarea}
              placeholder="Description of the gourmet item"
              value={details.en}
              onChange={(e) => setDetails({ ...details, en: e.target.value })}
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="detailFr">
              詳細 (仏語) / Details (French)
            </label>
            <textarea
              id="detailFr"
              className={styles.form_textarea}
              placeholder="Description of the gourmet item"
              value={details.fr}
              onChange={(e) => setDetails({ ...details, fr: e.target.value })}
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="detailJp">
              詳細 (日本語) / Details (Japanese)
            </label>
            <textarea
              id="detailJp"
              className={styles.form_textarea}
              placeholder="Description of the gourmet item"
              value={details.jp}
              onChange={(e) => setDetails({ ...details, jp: e.target.value })}
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="price">
              価格 (ランチなし) / Price (No Lunch)
            </label>
            <input
              type="text"
              id="price"
              className={priceError ? styles.error_border : styles.form_input}
              placeholder="e.g. 2000"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="priceLunch">
              価格 (ランチあり) / Price (With Lunch)
            </label>
            <input
              type="text"
              id="priceLunch"
              className={priceError ? styles.error_border : styles.form_input}
              placeholder="e.g. 2500"
              value={priceLunch}
              onChange={handlePriceLunchChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="volume">
              容量 / Volume
            </label>
            <input
              type="text"
              id="volume"
              className={styles.form_input}
              placeholder="e.g. 250ml"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>
          <div className="relative">
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
                <Image
                  src={image.url}
                  alt={gourmet.title.en}
                  width={150}
                  height={150}
                />
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
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditGourmetPage
