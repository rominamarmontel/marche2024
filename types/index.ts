export type TUser = {
  email: string,
  password: string
}

export type TCategory = {
  _id: string,
  catName: string
}

export type TGourmet = {
  _id: string
  category: TCategory
  title: {
    en: string
    fr: string
    jp: string
  }
  detail?: {
    en: string
    fr: string
    jp: string
  }
  genre?: string
  price: string
  priceLunch?: string
  volume?: string
  imageData?: { url: string; publicId: string }[];
  updatedAt?: string
}

export type TMarche = {
  _id: string
  category: TCategory
  title: {
    en: string
    fr: string
    jp: string
  }
  detail?: {
    en: string
    fr: string
    jp: string
  }
  genre?: string
  price: string
  priceLunch?: string
  volume?: string
  imageData?: { url: string; publicId: string }[];
  updatedAt?: string
}