const express = require('express');
const cors = require('cors');
const { User, Problem, sequelize } = require('./models');
const { Op } = require('sequelize');
const path = require('path');
const { fileURLToPath } = require('url');
const initializeDatabase = require('./database/init');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();

// Initialize database connection
const app = express();
const PORT = process.env.PORT || 7007;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const staticPath = path.join(__dirname, '../../dist');
app.use(express.static(staticPath));

async function startServer() {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Coding Problem Tracker API running on port ${PORT}`);
    console.log(`📊 Database: SQLite3`);
    console.log(`📁 Database file: ./database/database.sqlite`);
  });
}

const generateToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid password'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: user,
    token: generateToken(user)
  });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const user = await User.create(newUser);
    const token = generateToken(newUser);

    console.log('Token generated:', token);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
      token: token
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

app.post('/api/auth/verify', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Token is required'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    const { email } = decoded;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
});

// GET All Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Problem,
        as: 'problems'
      }]
    });

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error.message
    });
  }
});

// GET User by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Problem,
        as: 'problems',
        order: [['date', 'DESC']]
      }]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error.message
    });
  }
});

// ========== PROBLEM ROUTES ==========

// CREATE Problem
app.post('/api/users/:userId/problems', async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, platform, difficulty, topic, timeSpent, outcome, date, link, tags, isRevision } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const problem = await Problem.create({
      title,
      platform,
      difficulty,
      topic,
      timeSpent,
      outcome,
      date: date || new Date(),
      link,
      tags: tags || [],
      isRevision: isRevision || false,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      data: problem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating problem',
      error: error.message
    });
  }
});

// GET All Problems for a User
app.get('/api/users/:userId/problems', async (req, res) => {
  try {
    const { userId } = req.params;
    const { difficulty, platform, outcome, topic } = req.query;

    let whereClause = { userId };

    // Add filters if provided
    if (difficulty) whereClause.difficulty = difficulty;
    if (platform) whereClause.platform = platform;
    if (outcome) whereClause.outcome = outcome;
    if (topic) whereClause.topic = { [Op.like]: `%${topic}%` };

    const problems = await Problem.findAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName']
      }],
      order: [['date', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: problems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving problems',
      error: error.message
    });
  }
});

// GET Problem by ID
app.get('/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'email']
      }]
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    res.status(200).json({
      success: true,
      data: problem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving problem',
      error: error.message
    });
  }
});

// UPDATE Problem
app.put('/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    await problem.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Problem updated successfully',
      data: problem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating problem',
      error: error.message
    });
  }
});

// DELETE Problem
app.delete('/problems/:id', async (req, res) => {
  try {
    const problem = await Problem.findByPk(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    await problem.destroy();

    res.status(200).json({
      success: true,
      message: 'Problem deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting problem',
      error: error.message
    });
  }
});

// ========== ANALYTICS ROUTES ==========

// GET User Statistics
app.get('/users/:userId/stats', async (req, res) => {
  try {
    const { userId } = req.params;

    const totalProblems = await Problem.count({ where: { userId } });
    const solvedProblems = await Problem.count({ where: { userId, outcome: 'solved' } });
    const totalTimeSpent = await Problem.sum('timeSpent', { where: { userId } });

    const difficultyStats = await Problem.findAll({
      where: { userId },
      attributes: [
        'difficulty',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['difficulty'],
      raw: true
    });

    const platformStats = await Problem.findAll({
      where: { userId },
      attributes: [
        'platform',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['platform'],
      raw: true
    });

    res.status(200).json({
      success: true,
      data: {
        totalProblems,
        solvedProblems,
        totalTimeSpent: totalTimeSpent || 0,
        solveRate: totalProblems > 0 ? ((solvedProblems / totalProblems) * 100).toFixed(2) : 0,
        difficultyBreakdown: difficultyStats,
        platformBreakdown: platformStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving statistics',
      error: error.message
    });
  }
});

// ========== DATABASE UTILITIES ==========

// Reset database (useful for development)
app.post('/admin/reset-db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.json({
      success: true,
      message: 'Database reset successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resetting database',
      error: error.message
    });
  }
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

// Handle client-side routing (SPA fallback)
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  res.sendFile(path.join(staticPath, 'index.html'));
});

// Start the server
startServer().catch(console.error);