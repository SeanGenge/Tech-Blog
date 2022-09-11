const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/:id', async (req, res) => {
	const blogData = await Blog.findByPk(req.params.id, {
		include: [
			{
				// This is the user that wrote the blog
				model: User,
			},
			{
				model: Comment,
				include: {
					// This is the user that wrote the comment
					model: User
				}
			}
		]
	});
	
	const blog = blogData.get({ plain: true });
	
	res.render('blogpage', {
		loggedIn: req.session.loggedIn,
		username: req.session.username,
		userId: req.session.userId,
		blog
	});
});

module.exports = router;
