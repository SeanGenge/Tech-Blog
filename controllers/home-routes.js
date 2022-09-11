const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
	const blogsData = await Blog.findAll({
		include: [
			{
				model: User
			},
		],
	});
	
	let blogs = blogsData.map(blog => blog.get({plain: true }));
	
	// Add a text snippet to all blogs
	blogs = blogs.map(blog => {
		return {
			...blog,
			textSnippet: blog.contents.substr(0, 300) + "..."
		}
	})
	
	res.render('homepage', {
		blogs
	});
});

router.get('/login', (req, res) => {
	res.render('login');
});

module.exports = router;
