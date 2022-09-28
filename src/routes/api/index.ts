import express, { Request, Response } from 'express';
import image from './image';
const routes = express.Router();

routes.get('/', (_req: Request, res: Response) => {
  res.send('hello api');
});

routes.use('/image', image);

export default routes;
