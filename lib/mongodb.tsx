import mongoose from 'mongoose'

export const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB
  if (!mongoURI) {
    throw new Error('MONGODB_URI environment variable is not defined')
  }
  try {
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB', error)
  }
}
// import mongoose from 'mongoose'

// export const connectMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB)
//     console.log('Connected to MongoDB')
//   } catch (error) {
//     console.log('Error connecting to MongoDB', error)
//   }
// }
