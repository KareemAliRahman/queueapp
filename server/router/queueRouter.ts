import { Router }  from 'express';

export const QueueRouter = Router();

QueueRouter.get('/', (_req, res, _next) => {
  res.send('hello ya man from queues');
});

// POST new queue

// PATCH queue -> change queue

// DELETE queue