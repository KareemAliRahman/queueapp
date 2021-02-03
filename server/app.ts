import express from "express"; 
import { createConnection } from "typeorm";
import { User } from "./db/entity/User";
import { UserRepo } from "./db/repository/UserRepo";
import { UserRouter } from "./router/userRouter";
import { QueueRouter } from "./router/queueRouter"
import { urlencoded, json } from 'body-parser'

const app = express();
const startServer = async () => {
  // connecting to postgres db
  createConnection();
  // createConnection().then(connection => {
  //  const userRepo =  connection.getCustomRepository(UserRepo);
  //  userRepo.registerNewUser('hazem', 'ali', 'hazem@ali.com', 'hazem');
    
  // });

  // middleware for post requests
  app.use(urlencoded({extended: true}));
  app.use(json());
    
  app.get('/', (_req, res, _next) => {      
    console.log('get request');
    res.send('Hello world')
  });

  // routes
  app.use('/users', UserRouter);
  app.use('/queues', QueueRouter);

  app.listen(process.env.PORT || 4000, () => {
    console.log("server started");
  });
};

startServer();