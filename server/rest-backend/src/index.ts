import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/counter', (_req, res) => {
    res.json({count: 42});
});

app.listen(3001, () => console.log('REST backend on http://localhost:3001'));