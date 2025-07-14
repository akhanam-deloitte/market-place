import app from "../src/index";
const PORT = 3000;
import { sequelize } from './models';

// DB Connection Test
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection error:', err));

try {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(error)
}