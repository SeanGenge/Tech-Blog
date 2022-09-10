const { User } = require('../models');

const userData = [
	{
		username: 'seangenge',
		password: 'password1'
	},
	{
		username: 'jie',
		password: 'password2'
	},
	{
		username: 'james',
		password: 'password3'
	}
];

const seedUsers = () => User.bulkCreate(userData, {
	// Require this to call the beforeCreate hook to hash the password
	individualHooks: true
});

module.exports = seedUsers;
