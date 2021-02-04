import { compare, hash } from "bcryptjs";
import { validate, ValidationError } from "class-validator";
import { PassThrough } from "stream";
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepo extends Repository<User>{

    async registerNewUser(firstName: string
      , lastName: string
      , email: string
      , password: string
      ){
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        const errors = await validate(user);
        if(errors.length > 0) throw errors ;
        user.password = await hash(password, 12);
        return this.insert(user);
    }

    async loginUser(email: string, password: string){
      const user = await this.findOne({where: {email}});
      if(!user){
        throw new Error("User not registered");
      }
      const valid = await compare(password, user.password);
      if(!valid){
        throw new Error("invalid password");
      }
      return user;
    }

}
