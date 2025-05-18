import { BaseModel } from './base.model';

export interface Task extends BaseModel {
    name: string;
    type: string;
    date: Date;
    time: string;
}
