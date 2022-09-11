// I wrote this code for the farmers organiser project (project 2) so I am just using it with some modifications

const router = require('express').Router();
const { User, Blog } = require('../../models');

// Retrieve all the users
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll({
			include: [{ model: Blog }]
		});
		
		res.status(200).json({
			data: users
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Retrieve one user
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {
			include: [{ model: Blog }]
		});
		
		res.status(200).json({
			data: user
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Create a new user
router.post('/', async (req, res) => {
	try {
		// Check if the user already exists. This is required so you don't create a user with the same username
		const userData = await User.findOne({
			where: {
				username: req.body.username
			},
			individualHooks: true,
		});

		if (!userData) {
			// The user doesn't exist so create a new user
			const newUser = await User.create(req.body)
			.catch(err => {
				console.log(err);
			});
			
			// Save the details to the cookie
			req.session.save(() => {
				req.session.loggedIn = true;
				req.session.userId = newUser.id;
				req.session.username = newUser.username;

				res.status(200).json({
					data: newUser
				});
			});
		}
		else {
			// The user exists already
			res.status(400).json({
				message: "The username has already been used!"
			});
		}
	}
	catch (err) {
		res.status(400).json(err);
	}
});

// User login
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: {
				username: req.body.username
			}
		});

		if (!userData) {
			// No user with that username was found
			res.status(400).json({
				message: "The username doesn't exist!"
			});

			return;
		}
		
		// The user exists so now check if the password matches what is in the db
		const isValidPassword = await userData.checkPassword(req.body.password);
		
		if (!isValidPassword) {
			// The password is incorrect
			res.status(400).json({
				message: "The username or password is incorrect!"
			});

			return;
		}

		// Password is correct. Save the data
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.userId = userData.id;
			req.session.username = userData.username;
			
			res.status(200).json({
				data: userData
			})
		});
	}
	catch (err) {
		res.status(400).json({
			message: 'login error: ' + err
		});
	}
});

// Log the user out
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			// Don't send any data back
			res.status(204).end();
		});
	}
	else {
		// No user to logout
		res.status(404).end();
	}
});

// Update the user data
router.put('/:id', async (req, res) => {
	try {
		const updatedUser = await User.update(req.body, {
			where: {
				id: req.params.id
			},
			individualHooks: true,
		});

		if (!updatedUser[0]) {
			// No user exists with this id
			res.status(404).json({
				message: "No user with this id exists!"
			});

			return;
		}

		// the user exists and has been updated
		res.status(200).json({
			data: updatedUser,
			message: "User is updated!"
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

// Delete the user data
router.delete('/:id', async (req, res) => {
	try {
		const deletedUser = await User.destroy({
			where: {
				id: req.params.id
			},
		});
		if (!deletedUser) {
			// No user exists with this id
			res.status(404).json({
				message: "No user with this id exists!"
			});
			return;
		}
		
		// the user exists and has been updated
		res.status(200).json({
			message: `User ${req.params.id} is deleted!`
		});
	}
	catch (err) {
		res.status(500).json({
			message: err
		});
	}
});

module.exports = router;