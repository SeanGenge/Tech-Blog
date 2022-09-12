const moment = require('moment');

const formatDate = (date, format) => {
	return moment(date).format(format);
};

const commentIsUsers = (commentUserId, userId, options) => {
	if (userId === commentUserId) {
		return options.fn(this);
	}
	else {
		return options.inverse(this);
	}
}

module.exports = {
	formatDate,
	commentIsUsers
}