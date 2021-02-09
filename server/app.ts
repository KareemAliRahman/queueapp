import express, { Request, Response } from "express"; 
import { createConnection } from "typeorm";
import { UserRouter } from "./router/userRouter";
import { QueueRouter } from "./router/queueRouter"
import { AuthRouter } from "./router/AuthRouter";
import { verify } from "jsonwebtoken";

const app = express();

const authenticateToken = (req : Request, res :Response, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.sendStatus(401);
  const accessToken = authHeader.split(' ')[1];
  verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err , user ) => {
    if(err) return res.sendStatus(403);
    req['user'] = user;
    next();
  });
}

const startServer = async () => {
  // connecting to postgres db
  createConnection();

  // middleware for post requests
  app.use(express.json())
    
  app.get('/', (_req, res, _next) => {      
    res.send('Hello world')
  });

  // logging request
  app.use((req, _res, next) => {
    console.log(req.method, req.url);
    console.log(req.body);
    next();
  });
  // logging response
  app.use((_req, res, next) => {
    next();
    console.log("---------------------------------");
    console.log(res.statusCode);
    // console.log(res);
  });

  // routes
  app.use('/', AuthRouter);
  app.use('/users', UserRouter);
  app.use('/queues', authenticateToken, QueueRouter);

  app.listen(process.env.PORT || 4000, () => {
    console.log("server started");
  });
};

startServer();