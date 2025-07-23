const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getRecommendations
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/:id/recommendations', getRecommendations); // AI route

module.exports = router;