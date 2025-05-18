import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const usersFilePath = path.join(__dirname, '../data/users.json');

export class UserRepository {

    async getAll(): Promise<User[]> {
        try {
            const fileContent = await readFile(usersFilePath, 'utf8');
            return JSON.parse(fileContent) as User[];
        } catch (error) {

            if ((error as NodeJS.ErrnoException).code === 'ENOENT' || (error as Error).message.includes('Unexpected end of JSON')) {
                return [];
            }
            throw error;
        }
    }

    async getByLoginAndPassword(login: string, password: string): Promise<User | undefined> {
        const users = await this.getAll();
        return users.find(user => user.login === login && user.password === password);
    }

    async insert(user: User): Promise<User> {
        const users = await this.getAll();

        const newUser: User = {
            ...user,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        users.push(newUser);
        await writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');

        return newUser;
    }
}
