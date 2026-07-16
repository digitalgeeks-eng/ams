import Property from '../models/Property.js';
import Recommendation from '../models/Recommendation.js';

export const updateRecommendationData = async ({ userId, viewedProperty, searchQuery, location, minPrice, maxPrice }) => {
  const record = await Recommendation.findOne({ userId });
  const priceInteractions = { minPrice, maxPrice, averagePrice: minPrice && maxPrice ? (minPrice + maxPrice) / 2 : (record?.priceInteractions?.averagePrice || 0) };
  const updates = {
    $set: {
      updatedAt: new Date(),
      priceInteractions
    }
  };

  if (viewedProperty) {
    updates.$addToSet = { viewedProperties: viewedProperty };
  }

  if (searchQuery || location || minPrice || maxPrice) {
    updates.$push = {
      searchHistory: {
        query: searchQuery || '',
        location: location || '',
        priceRange: `${minPrice || 0}-${maxPrice || 0}`,
        createdAt: new Date()
      }
    };
  }

  if (location) {
    updates.$addToSet = {
      ...(updates.$addToSet || {}),
      preferredLocations: location
    };
  }

  await Recommendation.findOneAndUpdate({ userId }, updates, { upsert: true, new: true });
};

export const getRecommendations = async (userId) => {
  const record = await Recommendation.findOne({ userId });
  const preferredLocations = record?.preferredLocations || [];
  const priceRange = record?.priceInteractions?.averagePrice || 0;

  const filter = { approvalStatus: 'approved' };
  if (preferredLocations.length) filter.location = { $in: preferredLocations };
  if (priceRange) {
    filter.price = { $gte: Math.max(0, priceRange - 30000), $lte: priceRange + 30000 };
  }

  const recommended = await Property.find(filter).sort({ createdAt: -1 }).limit(8);
  return recommended;
};
