import {EntityRepository, Repository} from "typeorm";
import { Query } from "typeorm/driver/Query";
import { Queue } from "../entity/Queue";
import {User} from "../entity/User";

@EntityRepository(User)
export class QueueRepo extends Repository<Queue>{

    saveNewUser(name: string
      , user: User
      , description: string
      , organization: string
      ){
        let queue = new Queue();
        queue.name 
        return this.insert(user);
    }

}
