const express_auth = require('express');
const router_auth = express_auth.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');
router_auth.post('/register', authController.register);
router_auth.post('/login', authController.login);
router_auth.get('/me',verifyToken, authController.getProfile);
module.exports = router_auth;
