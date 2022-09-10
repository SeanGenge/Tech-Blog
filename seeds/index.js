const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedComments = require('./commentData');
const seedUsers = require('./userData');

const seedAll = async () => {
	await sequelize.sync({ force: true });

	// Seed all the data
	try {
		await seedUsers();
		await seedBlog();
		await seedComments();
	}
	catch (err) {
		console.log(err);
	}

	process.exit(0);
};

seedAll();
