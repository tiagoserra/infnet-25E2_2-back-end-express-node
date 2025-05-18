import express, { Router } from 'express';
import { TasksController } from '../controllers/tasks.controller';

const tasksRouter: Router = express.Router();
const tasksController = new TasksController();

tasksRouter.get('/', (req, res) => tasksController.getAllTasks(req, res));
tasksRouter.get('/:id', (req, res) => tasksController.getTaskById(req, res));
tasksRouter.post('/', (req, res) => tasksController.createTask(req, res));
tasksRouter.put('/:id', (req, res) => tasksController.updateTask(req, res));
tasksRouter.delete('/:id', (req, res) => tasksController.deleteTask(req, res));

export default tasksRouter;
