import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserProfile, followUser, getSuggestedUsers, updateUserProfile, getSearch } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile/:username', protectRoute, getUserProfile);
router.get('/suggested', protectRoute, getSuggestedUsers);
router.get('/search', protectRoute, getSearch)
router.post('/follow/:id', protectRoute, followUser);
router.post('/update', protectRoute, updateUserProfile);

export default router;