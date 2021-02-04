import { Router } from 'express';
import { getCustomRepository, getRepository, QueryFailedError } from 'typeorm';
import { UserRepo } from '../db/repository/UserRepo';

export const UserRouter = Router();

// Get users -> get all users
UserRouter.get('/', (_req, res, _next) => {
  res.send('hello ya man from users');
});

// POST Register
UserRouter.post('/', async (req, res) => {
  const userRepo = getCustomRepository(UserRepo);
  try{
    await userRepo.registerNewUser(req.body.firstName
      , req.body.lastName
      , req.body.email
      , req.body.password);
    res.status(202).json({ message: "user is successfully registered." });
  }
  catch(err){
    res.status(400).json({errors : err});
  }
});

// POST login
UserRouter.post('/login', async (req, res) => {
  const userRepo = getCustomRepository(UserRepo);
  try{
      await userRepo.loginUser(req.body.email, req.body.password);
  }
  catch(err){
    res.status(404).json({error: err.message});
    return;
  }
  res.status(201).json({message: "logged in"});


});


// POST logout

// DELETE userQueue as admin

// DELETE userQueue as user (remove membership in a queue)


