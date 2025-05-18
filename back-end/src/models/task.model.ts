import { BaseModel } from './base.model';

export interface Task extends BaseModel {
    name: string;
    date: Date;
    time: string;
    description: string;
}
