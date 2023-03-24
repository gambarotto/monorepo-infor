import { Router, Request, Response } from 'express';
import UserController from '../modules/users/controller/UserController';

const routes = Router();

routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.index);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'ok' })
})
export default routes;