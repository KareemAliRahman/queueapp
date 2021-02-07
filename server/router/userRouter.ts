import { Request, Response, Router } from 'express';
import { getCustomRepository, getRepository, QueryFailedError } from 'typeorm';
import { UserRepo } from '../db/repository/UserRepo';
import { sign, verify } from 'jsonwebtoken'

export const UserRouter = Router();


// Get users
UserRouter.get('/' , (req, res, _next) => {
  console.log(req['user']);
  res.send('hello ya man from users');
});

// POST Register
UserRouter.post('/', async (req, res) => {
  const userRepo = getCustomRepository(UserRepo);
  const user = await userRepo.checkUserExist(req.body.email);
  if(user){
    res.status(404).json({message: "user already exisits"});
    return;
  }
  try{
    await userRepo.registerNewUser(req.body.firstName
      , req.body.lastName
      , req.body.email
      , req.body.password);
    res.status(202).json({ message: "user is successfully registered." });
  }
  catch(err){
    // errors here should be ValidationError by class-validator
    //select the first constraint from the first ValidationError
    const message = Object.entries(err[0].constraints)[0][1];

    res.status(400).json({message : message});
  }
});
