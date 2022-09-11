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
			where: {
				user_id: req.session.userId
			}
		});

		let blogs = blogsData.map(blog => blog.get({ plain: true }));

		// Add a text snippet to all blogs
		blogs = blogs.map(blog => {
			return {
				...blog,
				textSnippet: blog.contents.substr(0, 300) + "..."
			}
		})

		res.render('dashboard', {
			loggedIn: req.session.loggedIn,
			username: req.session.username,
			blogs
		});
	}
	catch (err) {
		console.log(err);
	}
});

router.get('/create', (req, res) => {
	res.render('createABlog', {
		loggedIn: req.session.loggedIn,
		username: req.session.username,
		userId: req.session.userId
	});
});

module.exports = router;
