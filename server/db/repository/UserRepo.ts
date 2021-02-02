import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepo extends Repository<User>{

    saveNewUser(firstName: string, lastName: string){
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        return this.insert(user);
    }

}
