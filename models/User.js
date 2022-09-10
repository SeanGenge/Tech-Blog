const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
	checkPassword(password) {
		// Check if the password matches what is in the database
		return bcrypt.compareSync(password, this.password);
	}
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
	hooks: {
		beforeCreate: async (newUserData) => {
			// Encrypt the password before creating the user
			newUserData.password = await bcrypt.hash(newUserData.password, 10);
			
			return newUserData;
		},
		beforeUpdate: async (updatedUserData) => {
			// Encrypt the password before updating the user
			updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
			
			return updatedUserData;
		},
	},
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
