const { sequelize } = require('../models');

async function initializeDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync all models (create tables)
    await sequelize.sync({ force: false }); // Set force: true to drop existing tables
    console.log('✅ All models synchronized successfully.');

  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
    process.exit(1);
  }
}

module.exports = initializeDatabase;