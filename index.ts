import app from './app';
import path from 'path';

const startServer = () => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
};

startServer();
