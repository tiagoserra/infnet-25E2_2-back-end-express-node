import { BaseModel } from './base.model';

export interface User extends BaseModel {
    name: string;
    login: string;
    password: string;
    sessionId: string;
}
