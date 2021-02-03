import { Router } from 'express';
import { getCustomRepository, getRepository, QueryFailedError } from 'typeorm';
import { User } from '../db/entity/User';
import { UserRepo } from '../db/repository/UserRepo';

export const UserRouter = Router();

// Get users -> get all users
UserRouter.get('/', (_req, res, _next) => {
  res.send('hello ya man from users');
});

// POST Register
UserRouter.post('/', async (req, res) => {
  try{
    const userRepo = getCustomRepository(UserRepo);
    await userRepo.registerNewUser(req.body.firstName
      , req.body.lastName
      , req.body.email
      , req.body.password);
    res.status(202).json({ message: "new user created" });
  }
  catch(err){
    res.status(400).json({ errors : err});
  }
});

// POST login

// POST logout

// DELETE userQueue as admin

// DELETE userQueue as user (remove membership in a queue)


