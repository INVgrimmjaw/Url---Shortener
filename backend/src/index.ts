import 'dotenv/config';
import app from './app.js';
import { db } from './prisma/db.js';

const PORT = 3001;

await db.connect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});