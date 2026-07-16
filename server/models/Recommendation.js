import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  viewedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  searchHistory: [{ query: String, location: String, priceRange: String, createdAt: Date }],
  preferredLocations: [{ type: String }],
  priceInteractions: {
    minPrice: Number,
    maxPrice: Number,
    averagePrice: Number
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recommendation', recommendationSchema);
