const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const blogRoutes = require('./blog-routes.js');

router.use('/', homeRoutes);
router.use('/blog', blogRoutes);

module.exports = router;
