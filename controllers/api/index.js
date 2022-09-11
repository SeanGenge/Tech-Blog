const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const commentRoutes = require('./commentRoutes.js');
const blogRoutes = require('./blogRoutes.js');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
