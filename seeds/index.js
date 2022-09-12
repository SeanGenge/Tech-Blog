const sequelize = require('../config/connection');
const seedBlog = require('./blogData.js');
const seedComments = require('./commentData.js');
const seedUsers = require('./userData.js');

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
