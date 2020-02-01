import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import CourierController from './app/controllers/CourierController';
import RecipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);
routes.post('/couriers', CourierController.store);
routes.get('/couriers', CourierController.list);
routes.put('/couriers', CourierController.update);
routes.delete('/couriers', CourierController.delete);
routes.put('/users', UserController.update);

export default routes;
