const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// Retrieve all the blogs
router.get('/', async (req, res) => {
	try {
		const blog = await Blog.findAll({
			include: [{ model: User }, { model: Comment }]
		});

		res.status(200).json({
			data: blog
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Retrieve one blog
router.get('/:id', async (req, res) => {
	try {
		const blog = await Blog.findByPk(req.params.id, {
			include: [{ model: User }, { model: Comment }]
		});

		res.status(200).json({
			data: blog
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Create a new blog
router.post('/', async (req, res) => {
	try {
		// The user doesn't exist so create a new user
		const newBlog = await Blog.create(req.body)
			.catch(err => {
				console.log(err);
			});

		res.status(200).json({
			data: newBlog
		});
	}
	catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;