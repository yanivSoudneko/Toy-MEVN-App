const express = require('express');
const router = express.Router();

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const reviewRoutes = require('./api/review/review.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
