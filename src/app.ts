import express from 'express';
import dotenv from 'dotenv';
import linkRoutes from './routes/linkRoutes';
import slackRoutes from './routes/slackRoutes';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/links', linkRoutes);
app.use('/api/slack', slackRoutes);

app.use(errorHandler);

export default app;
