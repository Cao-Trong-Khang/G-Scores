import cors from 'cors';
import express from 'express';
import { scoreRoutes } from './routes/score.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/scores', scoreRoutes);

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'g-score-api',
  });
});
