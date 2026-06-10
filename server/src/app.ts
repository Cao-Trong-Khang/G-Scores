import cors from 'cors';
import express from 'express';
import { reportRoutes } from './routes/report.routes';
import { scoreRoutes } from './routes/score.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reports', reportRoutes);
app.use('/api/scores', scoreRoutes);

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    service: 'g-score-api',
  });
});
