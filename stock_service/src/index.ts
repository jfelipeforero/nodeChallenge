import { app } from './app';

const start = async () => {
  app.listen(5555, () => {
    console.log('Listening on port 5555!');
  });
};

start();
