import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { createPost, deletePost, commentPost, likePost, getAllPost, getLikedPosts, getFollowingPost, getUserPost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/all', protectRoute, getAllPost);
router.get('/following', protectRoute, getFollowingPost);
router.get('/user/:username', protectRoute, getUserPost);
router.get('/likes/:id', protectRoute, getLikedPosts);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, likePost);
router.post('/comment/:id', protectRoute, commentPost);
router.delete('/delete/:id', protectRoute, deletePost);

export default router;