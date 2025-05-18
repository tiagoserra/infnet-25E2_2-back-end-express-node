import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import authRouter from './routes/auth.routes';
import tasksRouter from './routes/tasks.routes';
import rateLimiter from './middlewares/limiter.middleware';

const cors = require('cors');
const { logRequest } = require('./middlewares/log.middleware');
const { authenticateToken } = require('./middlewares/auth.middleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(rateLimiter);
app.use(logRequest);
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

app.use('/api/tasks', authenticateToken, tasksRouter);

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
