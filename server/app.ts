import express from "express"; 
import { createConnection } from "typeorm";

const app = express();
const startServer = async () => {
    try {
        await createConnection().then(connection =>{
          console.log("connected to db");
        });
    }
    catch (err){
        console.log(err);
    }
    app.get('/', (req, res, next) => {      
      res.send('Hello world')
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log("server started");
    });
};

startServer();