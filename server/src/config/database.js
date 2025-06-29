const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite database configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite'),
  logging: console.log, // Set to false to disable SQL query logging
  define: {
    timestamps: true, // Adds createdAt and updatedAt
    underscored: false, // Use camelCase instead of snake_case
  }
});

module.exports = sequelize;