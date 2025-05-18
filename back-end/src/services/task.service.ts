import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

export class TaskService {
    private taskRepository: TaskRepository;
    
    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async getAllTasks(): Promise<Task[]> {
        try {
            return await this.taskRepository.getAll();
        } catch (error) {
            console.error('Error getting all tasks:', error);
            throw new Error('Failed to retrieve tasks');
        }
    }

    async getTaskById(id: string | number): Promise<Task | undefined> {
        try {
            const task = await this.taskRepository.getById(id);
            
            if (!task) {
                return undefined;
            }
            
            return task;
        } catch (error) {
            console.error(`Error getting task with id ${id}:`, error);
            throw new Error(`Failed to retrieve task with id ${id}`);
        }
    }

    async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
        try {
            if (!taskData.name || !taskData.type) {
                throw new Error('Task name and type are required');
            }
            
            return await this.taskRepository.insert(taskData as Task);
        } catch (error) {
            console.error('Error creating task:', error);
            throw new Error('Failed to create task');
        }
    }

    async updateTask(id: string | number, taskData: Partial<Task>): Promise<Task | undefined> {
        try {
            const existingTask = await this.taskRepository.getById(id);
            
            if (!existingTask) {
                return undefined;
            }
            
            return await this.taskRepository.update(id, taskData);
        } catch (error) {
            console.error(`Error updating task with id ${id}:`, error);
            throw new Error(`Failed to update task with id ${id}`);
        }
    }

    /**
     * Delete a task
     */
    async deleteTask(id: string | number): Promise<boolean> {
        try {
            return await this.taskRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting task with id ${id}:`, error);
            throw new Error(`Failed to delete task with id ${id}`);
        }
    }
}
