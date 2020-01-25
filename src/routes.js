import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import StudentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.post('/plan', PlanController.store);
routes.get('/plan', PlanController.list);
routes.put('/plan', PlanController.update);
routes.delete('/plan', PlanController.delete);
routes.put('/users', UserController.update);

export default routes;
