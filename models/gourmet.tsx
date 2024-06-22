import mongoose, { Schema, models } from 'mongoose'

const gourmetSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    title: {
      en: String,
      fr: String,
      jp: String,
    },
    detail: {
      en: String,
      fr: String,
      jp: String,
    },
    genre: {
      type: String,
      enum: [
        'set-menu',
        'starters',
        'rice',
        'yakitori',
        'sushi',
        'sashimi',
        'maki-temaki',
        'japanese-sake',
        'wine',
        'japanese-beer',
        'soft-drinks',
        'desserts',
        'red-wine',
        'white-wine',
        'champagne',
      ],
    },
    price: Number,
    priceLunch: Number,
    volume: String,
    imageData: {
      type: [
        {
          url: { type: String, default: '' },
          publicId: { type: String, default: '' },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

const Gourmet =
  mongoose.models.Gourmet || mongoose.model('Gourmet', gourmetSchema)

export default Gourmet
