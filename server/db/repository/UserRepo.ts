import { hash } from "bcryptjs";
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepo extends Repository<User>{

    async registerNewUser(firstName: string
      , lastName: string
      , email: string
      , passowrd: string
      ){
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = await hash(passowrd, 12);
        return this.insert(user);
    }

}
