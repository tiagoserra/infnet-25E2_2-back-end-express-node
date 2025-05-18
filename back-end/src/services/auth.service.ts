
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';

dotenv.config();

export class AuthService {
    private userRepository: UserRepository;
    
    constructor() {
        this.userRepository = new UserRepository();
    }

    async authenticate(login: string, password: string): Promise<string | null> {
        try {

            const user = await this.userRepository.getByLoginAndPassword(login, password);

            if (!user) {
                return null;
            }

            const token = this.generateToken(user);
            
            return token;
        } catch (error) {
            console.error('Authentication error:', error);
            throw new Error('Authentication failed');
        }
    }

    private generateToken(user: User): string {
        const secret = process.env.JWT_SECRET;
        
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const payload = {
            id: user.id,
            name: user.name,
            login: user.login
        };

        const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

        return jwt.sign(payload, secret, { expiresIn });
    }
}
