const express_review = require('express');
const router_review = express_review.Router();
const reviewController = require('../controllers/review.controller');
const { verifyToken: verifyToken_review } = require('../middleware/auth.middleware');
router_review.post('/movie/:movieId', verifyToken_review, reviewController.createReview);
module.exports = router_review;