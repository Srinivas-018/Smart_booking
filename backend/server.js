require('dotenv').config();
const { app, initializeDatabase } = require('./src/app');
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();