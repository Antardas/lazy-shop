const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
} = require('../controllers/productController');
const { isAuthenticated, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

// Prodoct CRUD Operation Routes
router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getOneProduct);
router.route('/admin/products/new').post(isAuthenticated, authorizedRoles('admin'), createProduct);
router
    .route('/admin/products/:id')
    .put(isAuthenticated, authorizedRoles('admin'), updateProduct)
    .delete(isAuthenticated, authorizedRoles('admin'), deleteProduct);

module.exports = router;
