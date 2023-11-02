const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const commentsRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/blogPosts', blogPostRoutes);
router.use('/comments', commentsRoutes)

module.exports = router;
