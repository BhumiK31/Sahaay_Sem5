const app = require('./app');
const config = require('./config/database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
config.connectDB();

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;