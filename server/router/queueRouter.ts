import { Router }  from 'express';
import { Queue } from '../db/entity/Queue';

export const QueueRouter = Router();

QueueRouter.get('/', (_req, res, _next) => {
  res.send('hello ya man from queues');
});

// POST new queue
QueueRouter.post('/', (req, res) => {
  
});

// PATCH queue -> change queue

// DELETE queue