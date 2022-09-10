const { Comment } = require('../models');

const commentData = [
	{
		text: 'Wow, this is really useful. Thanks for that',
		user_id: 1,
		blog_id: 1
	},
	{
		text: 'Going to use this in my next project!',
		user_id: 2,
		blog_id: 1
	},
	{
		text: 'Awesome blog',
		user_id: 3,
		blog_id: 1
	},
	{
		text: 'This is really useful',
		user_id: 2,
		blog_id: 2
	},
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
