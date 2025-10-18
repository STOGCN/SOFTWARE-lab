import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok : true, server: "api",time: new Date().toISOString() });
});

app.get('/users', (req, res) => {

    console.log(process.env.DB_HOST); // Example of using an environment variable
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASS);

    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ]);
});

app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}/`);
});

