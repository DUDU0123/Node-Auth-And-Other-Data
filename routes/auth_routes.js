const express = require('express');
const authRouteController = require('../controller/auth_controller.js');
const router = express.Router();
router.post('/login', authRouteController.handleLoginUser);
router.post('/signup', authRouteController.handleSignUpUser);
module.exports = router;