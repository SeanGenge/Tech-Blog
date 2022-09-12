const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/view/:id', async (req, res) => {
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
		],
		order: [
			[Comment, 'createdAt', 'DESC']
		],
	});
	
	const blog = blogData.get({ plain: true });
	
	// Check if this blog post is the users blog post
	const isUsersBlogPost = req.session.userId === blog.user.id;
	
	res.render('blogpage', {
		loggedIn: req.session.loggedIn,
		username: req.session.username,
		userId: req.session.userId,
		isUsersBlogPost,
		blog
	});
});

router.get('/create', (req, res) => {
	if (req.session.loggedIn) {
		res.render('createABlog', {
			loggedIn: req.session.loggedIn,
			username: req.session.username,
			userId: req.session.userId
		});
	}
	else {
		res.render('login');
	}
});

router.get('/edit/:id', async (req, res) => {
	if (req.session.loggedIn) {
		const blogData = await Blog.findByPk(req.params.id, {
			include: [{ model: User }, { model: Comment }]
		});
		
		const blog = blogData.get({ plain: true });
		
		res.render('editBlog', {
			loggedIn: req.session.loggedIn,
			username: req.session.username,
			userId: req.session.userId,
			blog
		});
	}
	else {
		res.render('login');
	}
});

module.exports = router;
