import { compare, hash } from "bcryptjs";
import { validate, ValidationError } from "class-validator";
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepo extends Repository<User>{

  async checkUserExist(email: string){
    const user = await this.findOne({where : {email: email.toLowerCase()}})
    return user;
  }

  async registerNewUser(firstName: string
    , lastName: string
    , email: string
    , password: string
    ){
      let user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email.toLowerCase();
      user.password = password;
      const errors = await validate(user);
      if(errors.length > 0) throw errors ;
      user.password = await hash(password, 12);
      return this.insert(user);
  }

  async loginUser(email: string, password: string){
    const user = await this.findOne({where: {email: email.toLowerCase()}});
    const valid = user && await compare(password, user.password);
    if(!user || !valid){
      throw new Error("invalid email or password");
    }
    return user;
  }

}
