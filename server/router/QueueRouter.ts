import { Router }  from 'express';
import { getCustomRepository } from 'typeorm';
import { QueueRepo } from '../db/repository/QueueRepo';
import { UserRepo } from '../db/repository/UserRepo';

export const QueueRouter = Router();

// GET -> get all queues for an admin
QueueRouter.get('/', async (req, res, _next) => {
  const userId = req['user'].userId.userid;
  try{
    const queueRepo = getCustomRepository(QueueRepo);
    const queues = await queueRepo.getMyQueues(userId);
    // const user = await userRepo.findOne(req['user'].userId.userid, {relations: ['queues']});
    res.status(200).json({queues: queues});
  }catch(error){
    res.status(404).json({error: error,message: "failed to get all queues of admin"});
  }
});

// GET -> get all queues
QueueRouter.get('/all', async (_req, res, _next) => {
  try{
    const queueRepo = getCustomRepository(QueueRepo);
    // const queues = await queueRepo.find();
    const queues = await queueRepo.getAllQueues();
    res.status(200).json({queues: queues});
  }catch(error){
    res.status(403);
  }
});

// POST -> create new queue
QueueRouter.post('/', async (req, res) => {
  try{
    const queueRepo = getCustomRepository(QueueRepo);
    const userRepo = getCustomRepository(UserRepo);
    const user = await userRepo.findOne(req['user'].userId);
    await queueRepo.createNewQueue(req.body.name 
      , user
      , req.body.organization
      , req.body.description);
    res.status(200).json({message: "queue created successfully"});
  }catch(error){
    res.status(403).json({error: error,message: "failed to create new queue"});
  }
});

// PUT queue -> change queue
// QueueRouter.put('/', (req, res) => {

// });

// DELETE queue
QueueRouter.delete('/', async (req, res) => {
  try{
    const queueRepo = getCustomRepository(QueueRepo);
    const userRepo = getCustomRepository(UserRepo);
    const queueId = req.body.queueId;
    const user = await userRepo.findOne(req['user'].userId);
    const queue = await queueRepo.findOne({relations: ['admin']});
    if(queue.admin.id !== user.id){
      return res.status(401).json({message: "queue admin only can delete a queue"})
    }
    await queueRepo.remove(queue);
    res.status(200).json({message: "queue removed successfully"});
  }catch(err){
    res.status(403).json({error: err, message: "failed to remove queue"});
  }
});


// POST /queues/members add new member to queue
QueueRouter.post('/members', async (req, res) => {
  try{
    const queueRepo = getCustomRepository(QueueRepo);
    const userRepo = getCustomRepository(UserRepo);
    const queueId = req.body.queueId;
    console.log(req['user'].userId);
    const user = await userRepo.findOne(req['user'].userId);
    const queue = await queueRepo.findOne(queueId, {relations: ['members']});
    queueRepo.enlistInQueue(queue, user);
    res.status(200).json({message: "member added successfully"});
  }catch(err){
    res.status(403).json({error: err.message , message: "failed to add member to queue"});
  }
});

// DELETE as user (remove membership in a queue)
QueueRouter.delete('/members', async (req, res) => {
  try{
    const queueRepo = getCustomRepository(QueueRepo);
    const userRepo = getCustomRepository(UserRepo);
    const queueId = req.body.queueId;
    const user = await userRepo.findOne(req['user'].userId);
    const queue = await queueRepo.findOne(queueId, {relations: ['members']});
    console.log(user, queue);
    queueRepo.removeFromQueue(queue, user);
    res.status(200).json({message: "member removed successfully"});
  }catch(err){
    res.status(403).json({error: err.message, message: "failed to remove member from queue"});
  }
});