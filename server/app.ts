import express from "express"; 
import { createConnection } from "typeorm";
import { User } from "./db/entity/User";

const app = express();
const startServer = async () => {
        createConnection().then( connection => {
          const allUsers = connection.manager.find(User);
          console.log("printing users");
          allUsers.then(us => us.map(u => console.log(u)));
        }).catch(err => {
        console.log(err);
    });
      
    app.get('/', (req, res, next) => {      
      res.send('Hello world')
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log("server started");
    });
};

startServer();