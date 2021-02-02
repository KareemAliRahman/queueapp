import express from "express"; 
import {createConnection} from "typeorm";

const app = express();
const startServer = async () => {
    try {
        await createConnection().then(connection =>{
        });
    }
    catch (err){
        console.log(err);
        await new Promise(res => setTimeout(res, 5000));
    }
    app.get('/', (req, res, next) => {      
      res.send('Hello world')
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log("server started");
    });
};

startServer();