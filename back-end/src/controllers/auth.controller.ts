import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                res.status(400).json({ message: 'Login and password are required' });
                return;
            }

            const token = await this.authService.authenticate(login, password);

            if (!token) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Authentication failed', error: (error as Error).message });
        }
    }
}
