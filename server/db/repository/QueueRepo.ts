import {EntityRepository, Repository} from "typeorm";
import { Queue } from "../entity/Queue";
import {User} from "../entity/User";

@EntityRepository(Queue)
export class QueueRepo extends Repository<Queue>{

    createNewQueue(name: string
      , admin: User
      , organization: string
      , description = ""
      ){
        let queue = new Queue();
        queue.name = name;
        queue.organization = organization;
        queue.description = description;
        queue.admin = admin
        return this.insert(queue);
    }

    enlistInQueue(queue: Queue, member: User){
      if(queue.members.some(u =>  u.id === member.id)) {
        throw new Error("user is already a member");
      }
      queue.members.push(member);
      return queue.save();
    }

    removeFromQueue(queue: Queue, member: User){
      if(queue.members.some(u =>  u.id === member.id)) {
        queue.members = queue.members.filter((u) => u.id !== member.id);
        return queue.save();
      }
      throw new Error("user is already a member");
    }

}
