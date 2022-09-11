const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
	try {
		const blogsData = await Blog.findAll({
			include: [
				{
					model: User
				},
			],
		});

		let blogs = blogsData.map(blog => blog.get({ plain: true }));

		// Add a text snippet to all blogs
		blogs = blogs.map(blog => {
			return {
				...blog,
				textSnippet: blog.contents.substr(0, 300) + "..."
			}
		})

		res.render('homepage', {
			loggedIn: req.session.loggedIn,
			username: req.session.username,
			blogs
		});
	}
	catch (err) {
		console.log(err);
	}
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/signup', (req, res) => {
	res.render('signup');
});

router.get('/logout', (req, res) => {
	res.render('logout');
});

module.exports = router;
