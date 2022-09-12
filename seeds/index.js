const sequelize = require('../config/connection');
const seedBlog = require('./BlogData.js');
const seedComments = require('./CommentData.js');
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
