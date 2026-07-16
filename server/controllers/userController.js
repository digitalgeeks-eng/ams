import User from '../models/User.js';
import Recommendation from '../models/Recommendation.js';
import { getRecommendations, updateRecommendationData } from '../services/recommendationService.js';

export const getProfile = async (req, res) => {
  res.json({ data: req.user });
};

export const updateProfile = async (req, res) => {
  const updates = { name: req.body.name || req.user.name };
  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
  res.json({ message: 'Profile updated', data: user });
};

export const getUserRecommendations = async (req, res) => {
  const recommendations = await getRecommendations(req.user._id);
  await updateRecommendationData({ userId: req.user._id });
  res.json({ data: recommendations });
};

export const addSearchHistory = async (req, res) => {
  const { query, location, minPrice, maxPrice } = req.body;
  await updateRecommendationData({ userId: req.user._id, searchQuery: query, location, minPrice, maxPrice });
  res.json({ message: 'Search history saved' });
};
