import { compare, hash } from "bcryptjs";
import { validate, ValidationError } from "class-validator";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

export interface UserRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

@EntityRepository(User)
export class UserRepo extends Repository<User> {
  async checkUserExist(email: string) {
    const user = await this.findOne({ where: { email: email.toLowerCase() } });
    return user;
  }

  async registerNewUser(userInput: UserRegisterInput) {
    let user = new User();
    user.firstName = userInput.firstName.trim();
    user.lastName = userInput.lastName.trim();
    user.email = userInput.email.toLowerCase().trim();
    user.password = userInput.password.trim();
    const errors = await validate(user);
    if (errors.length > 0) throw errors;
    user.password = await hash(userInput.password, 12);
    await this.insert(user);
    return user;
  }

  async loginUser(userInput: UserLoginInput) {
    const user = await this.findOne({
      where: { email: userInput.email.toLowerCase() },
    });
    const valid = user && (await compare(userInput.password, user.password));
    if (!user || !valid) {
      throw new Error("invalid email or password");
    }
    return user;
  }
}
