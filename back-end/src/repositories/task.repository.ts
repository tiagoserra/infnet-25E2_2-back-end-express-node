import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task.model';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const tasksFilePath = path.join(__dirname, '../data/tasks.json');

export class TaskRepository {

    async getAll(): Promise<Task[]> {
        try {
            const fileContent = await readFile(tasksFilePath, 'utf8');
            return JSON.parse(fileContent) as Task[];
        } catch (error) {

            if ((error as NodeJS.ErrnoException).code === 'ENOENT' || (error as Error).message.includes('Unexpected end of JSON')) {
                return [];
            }
            throw error;
        }
    }

    async getById(id: string | number): Promise<Task | undefined> {
        const tasks = await this.getAll();
        return tasks.find(task => task.id === id);
    }

    async insert(task: Task): Promise<Task> {
        const tasks = await this.getAll();

        const newTask: Task = {
            ...task,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        tasks.push(newTask);
        await writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');

        return newTask;
    }

    async update(id: string | number, taskData: Partial<Task>): Promise<Task | undefined> {
        const tasks = await this.getAll();
        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return undefined;
        }

        const updatedTask: Task = {
            ...tasks[taskIndex],
            ...taskData,
            updatedAt: new Date()
        };

        tasks[taskIndex] = updatedTask;
        await writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');

        return updatedTask;
    }

    async delete(id: string | number): Promise<boolean> {
        const tasks = await this.getAll();
        const initialLength = tasks.length;

        const filteredTasks = tasks.filter(task => task.id !== id);

        if (filteredTasks.length === initialLength) {
            return false;
        }

        await writeFile(tasksFilePath, JSON.stringify(filteredTasks, null, 2), 'utf8');
        return true;
    }
}
