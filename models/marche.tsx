import mongoose, { Schema, models } from 'mongoose'

const marcheSchema = new Schema(
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
        'aperitif',
        'wine',
        'drinks',
        'soft-drinks',
        'desserts',
        'red-wine',
        'rose-wine',
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

const Marche = mongoose.models.Marche || mongoose.model('Marche', marcheSchema)

export default Marche
