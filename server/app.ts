import express from "express"; 
import { createConnection } from "typeorm";
import { User } from "./db/entity/User";
import { UserRepo } from "./db/repository/UserRepo";

const app = express();
const startServer = async () => {
        createConnection().then( connection => {
          const userRepo = connection.getCustomRepository(UserRepo);
          // userRepo.saveNewUser("ahmad", "ali", "ahmad@ali.com", "ahmad@ali.com");
          // userRepo.saveNewUser("kareem", "ali", "kareem@ali.com", "kareem@ali.com");
          const allUsers = connection.manager.find(User);
          console.log("printing users");
          allUsers.then(us => us.map(u => console.log(u)));
        }).catch(err => {
        console.log(err);
    });
      
    app.get('/', (_req, res, _next) => {      
      console.log('get request');
      res.send('Hello world')
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log("server started");
    });
};

startServer();