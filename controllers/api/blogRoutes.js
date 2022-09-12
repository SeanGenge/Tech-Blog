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

// Delete the blog
router.delete('/:id', async (req, res) => {
	try {
		const deletedBlog = await Blog.destroy({
			where: {
				id: req.params.id
			},
		});
		
		if (!deletedBlog) {
			res.status(404).json({
				message: "No blog with this id exists!"
			});
			
			return;
		}

		res.status(200).json({
			message: `Blog ${req.params.id} is deleted!`
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Update blog
router.put('/:id', async (req, res) => {
	try {
		const updatedBlog = await Blog.update(req.body, {
			where: {
				id: req.params.id
			},
			individualHooks: true,
		});

		if (!updatedBlog[0]) {
			// No blog exists with this id
			res.status(404).json({
				message: "No blog with this id exists!"
			});

			return;
		}

		// the blog exists and has been updated
		res.status(200).json({
			data: updatedBlog,
			message: "Blog is updated!"
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

module.exports = router;