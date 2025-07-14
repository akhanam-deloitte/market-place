import express from 'express';
import cors from 'cors';
import routes from './routes'; // Import combined router

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use('/api', routes); // Mounts /api/auth and /api/items correctly





export default app;