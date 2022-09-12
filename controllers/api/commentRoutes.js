const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// Retrieve all the comments
router.get('/', async (req, res) => {
	try {
		const comments = await Comment.findAll({
			include: [{ model: User }, { model: Blog }]
		});

		res.status(200).json({
			data: comments
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Retrieve one comment
router.get('/:id', async (req, res) => {
	try {
		const comment = await Comment.findByPk(req.params.id, {
			include: [{ model: User }, { model: Blog }]
		});

		res.status(200).json({
			data: comment
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Create a new comment
router.post('/', async (req, res) => {
	try {
		// The user doesn't exist so create a new user
		const newComment = await Comment.create(req.body)
		.catch(err => {
			console.log(err);
		});

		res.status(200).json({
			data: newComment
		});
	}
	catch (err) {
		res.status(400).json(err);
	}
});

// Delete the comment
router.delete('/:id', async (req, res) => {
	try {
		const deletedComment = await Comment.destroy({
			where: {
				id: req.params.id
			},
		});

		if (!deletedComment) {
			res.status(404).json({
				message: "No comment with this id exists!"
			});

			return;
		}

		res.status(200).json({
			message: `Comment ${req.params.id} is deleted!`
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

module.exports = router;