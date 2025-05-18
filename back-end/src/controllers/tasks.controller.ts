import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

export class TasksController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve tasks', error: (error as Error).message });
        }
    }

    async getTaskById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            
            const task = await this.taskService.getTaskById(id);
            
            if (!task) {
                res.status(404).json({ message: `Task with id ${id} not found` });
                return;
            }
            
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve task', error: (error as Error).message });
        }
    }

    async createTask(req: Request, res: Response): Promise<void> {
        try {
            const taskData = req.body as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
            
            if (!taskData.name ) {
                res.status(400).json({ message: 'Task name and type are required' });
                return;
            }
            
            const newTask = await this.taskService.createTask(taskData);
            
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create task', error: (error as Error).message });
        }
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const taskData = req.body as Partial<Task>;
            
            if (Object.keys(taskData).length === 0) {
                res.status(400).json({ message: 'No data provided for update' });
                return;
            }
            
            const updatedTask = await this.taskService.updateTask(id, taskData);
            
            if (!updatedTask) {
                res.status(404).json({ message: `Task with id ${id} not found` });
                return;
            }
            
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update task', error: (error as Error).message });
        }
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            
            const deleted = await this.taskService.deleteTask(id);
            
            if (!deleted) {
                res.status(404).json({ message: `Task with id ${id} not found` });
                return;
            }
            
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete task', error: (error as Error).message });
        }
    }
}
