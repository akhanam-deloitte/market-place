import express from 'express';
import cors from 'cors';
import routes from './routes'; // Import combined router
import { sequelize } from './models';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use('/api', routes); // Mounts /api/auth and /api/items correctly

// DB Connection Test
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
