const express = require('express');
const router = express.Router();

const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const toyRoutes = require('./api/toys/toy.routes');
const reviewRoutes = require('./api/review/review.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/toy', toyRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
