const sequelize = require('../config/database');
const UserModel = require('./User');
const ProblemModel = require('./Problem');

// Initialize models
const User = UserModel(sequelize);
const Problem = ProblemModel(sequelize);

// Define associations
User.hasMany(Problem, {
  foreignKey: 'userId',
  as: 'problems',
  onDelete: 'CASCADE'
});

Problem.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Problem
};