const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
} = require('../controllers/productController');

const router = express.Router();

// Prodoct CRUD Operation Routes
router.route('/products').get(getAllProducts);
router.route('/products/new').post(createProduct);
router.route('/products/:id').put(updateProduct).delete(deleteProduct).get(getOneProduct);
module.exports = router;
