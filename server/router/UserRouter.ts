import { Request, Response, Router } from "express";
import { getCustomRepository, getRepository, QueryFailedError } from "typeorm";
import { UserRegisterInput, UserRepo } from "../db/repository/UserRepo";
import { userRegisterSchema } from "../validators/UserValidators";

export const UserRouter = Router();

// Get users
UserRouter.get("/", (req, res, _next) => {
  console.log(req["user"]);
  res.send("hello ya man from users");
});

// POST Register
UserRouter.post("/", async (req, res) => {
  const userRepo = getCustomRepository(UserRepo);
  const user = await userRepo.checkUserExist(req.body.email);
  if (user) {
    res.status(404).json({ error: req.t("invalid_email") });
    return;
  }
  try {
    const userReqObject: UserRegisterInput = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    await userRegisterSchema.validate(userReqObject, { abortEarly: false });

    await userRepo.registerNewUser(userReqObject);
    res.status(202).json({ message: req.t("user_created") });
  } catch (err) {
    // errors here should be ValidationError by class-validator
    //select the first constraint from the first ValidationError
    // const message = Object.entries(err[0].constraints)[0][1];

    console.log(err);
    res.status(400).json({
      errors: err.inner.map((o) => ({
        field: o.path,
        error: req.t(o.message),
      })),
    });
    // res.status(400).json({ errors: err.errors.map((m) => req.t(m)) });
  }
});
