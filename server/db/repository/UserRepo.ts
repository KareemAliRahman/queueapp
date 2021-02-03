import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepo extends Repository<User>{

    saveNewUser(firstName: string
      , lastName: string
      , email: string
      , passowrd: string
      ){
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.passowrd = passowrd;
        return this.insert(user);
    }

}
