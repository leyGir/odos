// Load environment variables from the .env file.
try {
    require('dotenv').config();
  } catch (err) {
    console.log('No .env file loaded');
  }

exports.databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/odos';
exports.port = process.env.PORT || '3000';

// Validate that port is a positive integer.
// if (process.env.PORT) {
//     const parsedPort = parseInt(process.env.PORT, 10);
//     if (!Number.isInteger(parsedPort)) {
//       throw new Error('Environment variable $PORT must be an integer');
//     } else if (parsedPort < 1 || parsedPort > 65535) {
//       throw new Error('Environment variable $PORT must be a valid port number');
//     }
//   }
  